export function savePlayerPosition(player) {
    player.savedPosition = { x: player.x, y: player.y };
    console.log(`Player position saved: (${player.savedPosition.x}, ${player.savedPosition.y})`);
}

export function reCenterPlayer(player) {
    if (player.savedPosition) {
        player.setPosition(player.savedPosition.x, player.savedPosition.y);
        console.log(`Player re-centered to saved position: (${player.x}, ${player.y})`);
    } else {
        console.log('No saved position found for re-centering.');
    }
}

export function showCountdown(scene, seconds) {
    scene.isPaused = true;
    scene.physics.pause();
    scene.countdownText.setVisible(true);
    countdown(scene, seconds);
}

function countdown(scene, seconds) {
    if (seconds > 0) {
        console.log(`Countdown: ${seconds}`);
        scene.countdownText.setText(seconds);
        scene.time.delayedCall(1000, () => countdown(scene, seconds - 1), [], scene);
    } else {
        console.log('Countdown finished. Resuming game...');
        scene.time.delayedCall(500, () => {
            scene.countdownText.setVisible(false);
            scene.physics.resume();
            scene.isPaused = false;
        }, [], scene); // Add a slight delay before resuming the game
    }
}
