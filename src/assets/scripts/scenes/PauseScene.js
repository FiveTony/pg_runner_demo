export default class PauseScene extends Phaser.Scene {
    constructor() {
        super('Pause')
    }
    create(data) {
        this.createButtons()
        this.onHover()
        this.onButtons()
    }
    createButtons() {
        this.pause = this.add.sprite(this.game.config.width - 62 - 32, 18, 'pause').setOrigin(0).setInteractive()
        this.continue = this.add.sprite(89, 342, 'btn1Pause').setOrigin(0).setInteractive()
        this.restart = this.add.sprite(107, 458, 'btn2Pause').setOrigin(0).setInteractive()
    }
    onButtons() {
        this.continue.on('pointerdown', () => {
            this.scene.sleep('Pause');
            this.scene.resume('Game')
        })
        this.pause.on('pointerdown', () => {
            this.scene.sleep('Pause');
            this.scene.resume('Game')
        })
        this.restart.on('pointerdown', () => {
            this.scene.start('Game', {
                status: 'first'
            })
        })
    }
    onHover() {
        this.continue.on('pointerover', () => {
            this.continue.setTexture('btn1PauseHover')
        })
        this.continue.on('pointerout', () => {
            this.continue.setTexture('btn1Pause')
        })
        this.restart.on('pointerover', () => {
            this.restart.setTexture('btn2PauseHover')
        })
        this.restart.on('pointerout', () => {
            this.restart.setTexture('btn2Pause')
        })
    }
}