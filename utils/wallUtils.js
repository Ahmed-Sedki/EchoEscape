// utils/wallUtils.js

export function createExitBlock(scene, mazeWidth, mazeHeight, tileSize) {
    const exitBlock = scene.add.rectangle((mazeWidth - 1) * tileSize + tileSize / 2, (mazeHeight - 1) * tileSize + tileSize / 2, tileSize, tileSize, 0x00ff00);
    scene.physics.add.existing(exitBlock);
    exitBlock.body.setImmovable(true);
    exitBlock.setVisible(false); // Initially hide the exit block

    return exitBlock;
}
