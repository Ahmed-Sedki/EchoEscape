export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.audio('pulse', 'assets/sounds/pulse.wav');
        this.load.image('player', 'assets/images/player.png');
        this.load.image('shield', 'assets/images/shield.svg');
        this.load.image('reveal', 'assets/images/reveal.svg');
        this.load.image('invincibility', 'assets/images/invincibility.png'); // Invincibility power-up image
    }

    create() {
        this.scene.start('GameScene');
        this.scene.start('UIScene');
        this.scene.start('UIOverlay');
    }
}
