export default class UIScene extends Phaser.Scene {
    constructor() {
        super('UIScene');
    }

    create() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.gameScene = this.scene.get('GameScene');

        this.gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '32px', fill: '#ff0000' });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.setVisible(false);

        this.winText = this.add.text(400, 300, 'Congratulations!', { fontSize: '32px', fill: '#00ff00' });
        this.winText.setOrigin(0.5);
        this.winText.setVisible(false);

        this.restartButton = this.add.text(400, 350, 'Restart', { fontSize: '32px', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => this.restartGame())
            .setVisible(false);
        this.restartButton.setOrigin(0.5);

        this.continueButton = this.add.text(400, 400, 'Continue', { fontSize: '32px', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => this.continueGame())
            .setVisible(false);
        this.continueButton.setOrigin(0.5);

        this.gameScene.events.on('gameOver', this.showGameOver, this);
        this.gameScene.events.on('gameWon', this.showWin, this);
    }

    showGameOver() {
        this.gameOverText.setVisible(true);
        this.restartButton.setVisible(true);
        this.continueButton.setVisible(false); // Hide continue button on game over
        this.registry.set('shields', 0);
        this.registry.set('mazesCompleted', 0);
    }

    showWin() {
        this.winText.setVisible(true);
        this.restartButton.setVisible(true);
        this.continueButton.setVisible(true); // Show continue button on game won
        const completedMazes = this.registry.get('mazesCompleted') || 0;
        this.registry.set('mazesCompleted', completedMazes);
    }

    restartGame() {
        this.gameOverText.setVisible(false);
        this.winText.setVisible(false);
        this.restartButton.setVisible(false);
        this.continueButton.setVisible(false);

        this.scene.stop('GameScene');
        this.scene.start('GameScene');

        this.scene.stop('UIScene');
        this.scene.start('UIScene');
    }

    continueGame() {
        this.winText.setVisible(false);
        this.restartButton.setVisible(false);
        this.continueButton.setVisible(false);

        // Ensure the state is reset before starting the game scene again
        this.scene.stop('GameScene');
        this.scene.launch('GameScene'); // Use launch to reset the state properly
    }
}
