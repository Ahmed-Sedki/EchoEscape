// utils/playerUtils.js

import { savePlayerPosition } from './gameUtils.js';

export function setupPlayer(scene, tileSize) {
    const player = scene.physics.add.sprite(tileSize + tileSize / 2, tileSize + tileSize / 2, 'player');
    player.setDisplaySize(20, 20);
    player.setCollideWorldBounds(true);
    player.shieldCount = 0; // Initialize shield count
    player.isInvincible = false; // Initialize invincibility state

    scene.registry.set('shields', player.shieldCount);

    return player;
}

export function setupPlayerControls(scene, player) {
    scene.input.keyboard.on('keydown', (event) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            console.log(`Saving player position: (${player.x}, ${player.y})`);
            savePlayerPosition(player);
        }
    });
}
