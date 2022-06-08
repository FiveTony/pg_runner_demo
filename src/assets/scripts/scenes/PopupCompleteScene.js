const POPUP_WIN_WIDTH = 350
const POPUP_WIN_HEIGHT = 450

export default class PopupCompleteScene extends Phaser.Scene {
    constructor() {
        super('PopupComplete')
    }
    create(data) {
        this.createBackground()
        if (data.status == 'win')
            this.createWinPopup()
        else if (data.status == 'lose')
            this.createLosePopup()
    }
    update() {
        this.stars.tilePositionY += -0.6
    }
    createBackground() {
        var bg = this.add.graphics()
        bg.fillStyle(0x0B081A, 0.8)
        bg.fillRect(0, 0, this.game.config.width, this.game.config.height)
        this.stars = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'stars').setOrigin(0)
    }
    createWinPopup() {
        this.winContainer = this.add.container(0, -533);
        // let winRect = this.add.graphics()
        // winRect.fillStyle(0x5D5786, 1)
        // winRect.fillRoundedRect(0, 0, POPUP_WIN_WIDTH, POPUP_WIN_HEIGHT, 5)

        this.planet = this.add.sprite(POPUP_WIN_WIDTH / 2, 140, 'winPlanet').setOrigin(0.5).setScale(1.5)
        this.btnClose = this.add.sprite(POPUP_WIN_WIDTH - 20, 40, 'winClose').setOrigin(0.5).setInteractive().setScale(1.5)

        let text1 = this.add.text(POPUP_WIN_WIDTH / 2, 300, 'ПОБЕДА!', {
            font: '60px BalsamiqSans'
        }).setOrigin(0.5).setTint(0xF1A901, 0xF1A901, 0xFFE305, 0xFFE305)

        this.winContainer.add([text1, this.planet, this.btnClose])
        this.tweens.add({
            targets: this.winContainer,
            x: this.game.config.width / 2 - POPUP_WIN_WIDTH / 2,
            y: 120,
            ease: 'Cubic',
            duration: 1000
        })

        // this.btnPrise.on('pointerdown', () => {})
        this.btnClose.on('pointerdown', () => { this.scene.start("Start"); })
    }
    createLosePopup() {
        this.loseContainer = this.add.container(0, -533);
        let loseRect = this.add.graphics()
        loseRect.fillStyle(0x5D5786, 1)
        loseRect.fillRoundedRect(0, 0, 480, 533, 8)
        this.btnNewGame = this.add.sprite(72, 215, 'btnLoseNewGame').setOrigin(0).setInteractive()
        this.btnExit = this.add.sprite(144, 331, 'btnLoseExit').setOrigin(0).setInteractive()
        let playText = this.add.text(94, 127, 'ПОРАЖЕНИЕ', {
            font: '44px BalsamiqSans',
            fill: '#9F90FC'
        }).setOrigin(0)
        this.loseContainer.add([loseRect, playText, this.btnNewGame, this.btnExit])
        this.tweens.add({
            targets: this.loseContainer,
            x: 10,
            y: 120,
            ease: 'Cubic',
            duration: 1000
        })
        this.btnNewGame.on('pointerdown', () => {
            this.scene.start('Game', {
                status: 'first'
            })
        })
        // this.btnExit.on('pointerdown', () => {})
    }

}