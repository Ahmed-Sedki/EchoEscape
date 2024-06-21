import BootScene from './scenes/BootScene.js';
import GameScene from './scenes/GameScene.js';
import UIScene from './scenes/UIScene.js';
import UIOverlay from './utils/UIOverlay.js';

const config = {
    type: Phaser.AUTO,
    width: 1200, // 800px for the game, 400px for the UI
    height: 600,
    backgroundColor: '#000',
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
    scene: [BootScene, GameScene, UIScene, UIOverlay] // Ensure UIOverlay is included
};

const game = new Phaser.Game(config);
