// eventListeners.js

import { collectPowerUp } from './powerups.js';

export function setupEventListeners(scene) {
    scene.physics.add.collider(scene.player, scene.walls, scene.hitWall, null, scene);
    scene.physics.add.overlap(scene.player, scene.powerUps, (player, powerUp) => collectPowerUp(player, powerUp, scene), null, scene);
}
