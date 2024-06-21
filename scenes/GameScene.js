import { createPowerUps, collectPowerUp } from '../utils/powerups.js';
import { showCountdown, reCenterPlayer, savePlayerPosition } from '../utils/gameUtils.js';
import { setupMaze, revealMaze, emitPulse } from '../utils/mazeUtils.js';
import { setupPlayer, setupPlayerControls } from '../utils/playerUtils.js';
import { createExitBlock } from '../utils/wallUtils.js';
import { setupEventListeners } from '../utils/eventListeners.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.lastSavedPosition = { x: null, y: null }; // Store the last saved position
    }

    create() {
        const mazeWidth = 25;
        const mazeHeight = 19;
        const tileSize = 32;
        this.gameOver = false;
        this.isPaused = false;

        this.walls = setupMaze(this, mazeWidth, mazeHeight, tileSize);
        this.player = setupPlayer(this, tileSize);
        setupPlayerControls(this, this.player);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.pulseSound = this.sound.add('pulse');

        this.powerUps = createPowerUps(this, this.walls, mazeWidth, mazeHeight, tileSize);
        this.exitBlock = createExitBlock(this, mazeWidth, mazeHeight, tileSize);

        this.warningText = this.add.text(400, 50, 'Hit a wall! Shield used!', { fontSize: '24px', fill: '#ff0000' });
        this.warningText.setOrigin(0.5);
        this.warningText.setVisible(false);

        this.countdownText = this.add.text(400, 300, '', { fontSize: '48px', fill: '#ffffff' });
        this.countdownText.setOrigin(0.5);
        this.countdownText.setVisible(false);

        setupEventListeners(this);

        // Schedule regular pulses to reveal the maze
        this.time.addEvent({
            delay: 1000, // Delay between pulses in milliseconds
            callback: () => emitPulse(this, this.player, this.walls, this.exitBlock),
            loop: true
        });

        // Reveal the maze at the start for a brief period
        revealMaze(this, this.walls, this.exitBlock);
    }

    update() {
        if (this.gameOver || this.isPaused) return;

        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
        }

        // Check if player reaches the exit
        if (!this.gameOver && this.player.x > (25 - 1) * 32 && this.player.y > (19 - 1) * 32) {
            console.log('Player has reached the exit!');
            this.physics.pause();
            let completedMazes = this.registry.get('mazesCompleted') || 0;
            console.log(`Current completed mazes: ${completedMazes}`);
            this.registry.set('mazesCompleted', completedMazes + 1);
            console.log(`New completed mazes: ${completedMazes + 1}`);
            this.events.emit('gameWon');
            this.gameOver = true; // Ensure this is set to true to prevent multiple triggers
        }
    }

    hitWall(player, wall) {
        if (this.gameOver) return;

        if (player.isInvincible) {
            console.log('Player is invincible, no effect on hit!');
            return;
        }

        if (player.shieldCount > 0) {
            console.log('Shield absorbed the hit!');
            player.shieldCount -= 1;
            this.registry.set('shields', player.shieldCount);

            this.warningText.setVisible(true);
            this.time.delayedCall(1000, () => {
                this.warningText.setVisible(false);
            }, [], this);

            reCenterPlayer(player);

            console.log('Starting countdown...');
            showCountdown(this, 3);
            return;
        }

        console.log('Player hit a wall!');
        this.physics.pause();
        this.events.emit('gameOver');
        this.gameOver = true;
    }
}
