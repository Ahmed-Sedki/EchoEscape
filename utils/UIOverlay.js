export default class UIOverlay extends Phaser.Scene {
    constructor() {
        super({ key: 'UIOverlay' });
    }

    create() {
        console.log("UIOverlay scene started");

        // Add background for the status area
        this.add.rectangle(800, 0, 400, 600, 0x000000, 0.7).setOrigin(0, 0);

        // Add text elements for player status
        this.shieldText = this.add.text(820, 50, 'Shields: 0', { fontSize: '24px', fill: '#ffffff' });
        this.mazeText = this.add.text(820, 100, 'Mazes Completed: 0', { fontSize: '24px', fill: '#ffffff' });
        this.invincibilityTimerText = this.add.text(820, 150, 'Invincibility Time: 0', { fontSize: '24px', fill: '#ffffff' }); // New invincibility timer text

        // Listen for events to update the status
        this.registry.events.on('changedata', this.updateStatus, this);

        console.log("UIOverlay elements created");
    }

    updateStatus(parent, key, data) {
        console.log(`Updating status: ${key} = ${data}`);
        if (key === 'shields') {
            this.shieldText.setText('Shields: ' + data);
        } else if (key === 'mazesCompleted') {
            this.mazeText.setText('Mazes Completed: ' + data);
        } else if (key === 'invincibilityDuration') {
            this.invincibilityTimerText.setText('Invincibility Time: ' + data);
        }
    }
}
