// powerups.js
export function createPowerUps(scene, walls, mazeWidth, mazeHeight, tileSize) {
    const powerUps = scene.physics.add.group();
    const powerUpCount = 5;
    let placed = 0;

    while (placed < powerUpCount) {
        let x = Phaser.Math.Between(0, mazeWidth - 1);
        let y = Phaser.Math.Between(0, mazeHeight - 1);

        if (walls.getChildren().some(wall => wall.x === x * tileSize + tileSize / 2 && wall.y === y * tileSize + tileSize / 2)) {
            continue;
        }

        let type;
        const randomType = Phaser.Math.Between(0, 2);
        if (randomType === 0) {
            type = 'shield';
        } else if (randomType === 1) {
            type = 'reveal';
        } else {
            type = 'invincibility';
        }

        let powerUp = powerUps.create(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, type).setDisplaySize(20, 20);
        powerUp.type = type;

        placed++;
    }

    return powerUps;
}

export function collectPowerUp(player, powerUp, scene) {
    console.log('Collected a power-up!');
    powerUp.disableBody(true, true);

    if (powerUp.type === 'shield') {
        player.shieldCount = (player.shieldCount || 0) + 1;
        console.log(`Shields collected: ${player.shieldCount}`);
        scene.registry.set('shields', player.shieldCount); // Update registry
    } else if (powerUp.type === 'reveal') {
        scene.revealMaze();
        console.log('Maze revealed!');
    } else if (powerUp.type === 'invincibility') {
        enableInvincibility(player, scene);
    }
}

function enableInvincibility(player, scene, duration = 5000) { // Default duration to 5000ms (5 seconds)
    player.isInvincible = true;
    player.setTint(0xff0000); // Change player color to indicate invincibility
    console.log('Player is invincible!');

    // Set invincibility duration in registry to trigger UI update
    scene.registry.set('invincibilityDuration', duration / 1000);

    const countdownEvent = scene.time.addEvent({
        delay: 1000,
        callback: () => {
            let currentDuration = scene.registry.get('invincibilityDuration');
            if (currentDuration > 0) {
                scene.registry.set('invincibilityDuration', currentDuration - 1);
            } else {
                countdownEvent.remove();
            }
        },
        loop: true
    });

    scene.time.delayedCall(duration, () => {
        player.isInvincible = false;
        player.clearTint(); // Reset player color
        scene.registry.set('invincibilityDuration', 0); // Reset countdown
        console.log('Player is no longer invincible.');
    });
}
