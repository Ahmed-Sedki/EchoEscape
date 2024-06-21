// utils/mazeUtils.js

import { createMaze } from './maze.js';

export function setupMaze(scene, mazeWidth, mazeHeight, tileSize) {
    const walls = scene.physics.add.staticGroup();
    const maze = createMaze(mazeWidth, mazeHeight);

    for (let y = 0; y < mazeHeight; y++) {
        for (let x = 0; x < mazeWidth; x++) {
            if (maze[y][x] === 1) {
                let wall = walls.create(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, null);
                wall.setSize(tileSize, tileSize);
                wall.setOrigin(0.5, 0.5);
                wall.setImmovable(true);
                wall.body.updateFromGameObject();
                wall.setVisible(false); // Initially hide the walls
            }
        }
    }

    return walls;
}

export function revealMaze(scene, walls, exitBlock, duration = 2000) {
    walls.children.iterate((wall) => {
        wall.setVisible(true);
    });

    exitBlock.setVisible(true);

    scene.time.delayedCall(duration, () => {
        walls.children.iterate((wall) => {
            wall.setVisible(false);
        });
        exitBlock.setVisible(false);
    }, [], scene);
}

export function emitPulse(scene, player, walls, exitBlock, pulseRadius = 100) {
    if (scene.gameOver || scene.isPaused) return;

    walls.children.iterate((wall) => {
        if (Phaser.Math.Distance.Between(player.x, player.y, wall.x, wall.y) <= pulseRadius) {
            wall.setVisible(true);
            scene.time.delayedCall(500, () => {
                wall.setVisible(false);
            }, [], scene);
        }
    });

    if (Phaser.Math.Distance.Between(player.x, player.y, exitBlock.x, exitBlock.y) <= pulseRadius) {
        exitBlock.setVisible(true);
        scene.time.delayedCall(500, () => {
            exitBlock.setVisible(false);
        }, [], scene);
    }

    scene.pulseSound.play();
}
