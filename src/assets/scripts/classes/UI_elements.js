const WIDTH = 500
const HEIGHT = 800

const PLAY_WIDTH = 62
const PLAY_HEIGHT = 54
const PLAY_X = WIDTH - PLAY_WIDTH - 32
const PLAY_Y = 18

const SOUND_WIDTH = 62
const SOUND_HEIGHT = 54
const SOUND_X = 31
const SOUND_Y = 18

const TEXT_STYLE = {
    font: '24px BalsamiqSans',
    fill: '#FFFFFF'
}

export default class UI_elements {
    constructor(scene, score, hearts) {
        this.scene = scene
        this.score = score
        this.hearts = hearts
        this.createStats()
        this.createButtons()
    }
    createStats() {

        this.graphicsScore = this.scene.add.graphics().fillStyle(0xFFC700, 1).setDepth(1)
        this.graphicsScore.fillRoundedRect(137, 24, 122, 42, 10)
        this.scene.add.sprite(123, 24, 'scoreCoin').setOrigin(0).setDepth(1)
        this.rect2 = this.scene.add.text(184, 45, `${this.score}`, TEXT_STYLE).setDepth(1).setOrigin(0.5)

        //Phaser.Geom.Rectangle.FitInside(this.rect2, this.rect1) //TODO попробовать

        this.graphicsHearts = this.scene.add.graphics().fillStyle(0xFFC700, 1).setDepth(1)
        this.graphicsHearts.fillRoundedRect(294, 24, 82, 42, 10)
        this.heartsImg = this.scene.add.sprite(274, 24, 'hearts').setOrigin(0).setDepth(1)
        this.rect4 = this.scene.add.text(330, 32, `${this.hearts}`, TEXT_STYLE).setDepth(1)
    }
    createButtons() {
        this.play = this.scene.add.sprite(PLAY_X, PLAY_Y, 'play').setOrigin(0).setInteractive().setDepth(1)
        this.sound = this.scene.add.sprite(SOUND_X, SOUND_Y, 'soundOn').setOrigin(0).setInteractive().setDepth(1)
    }


}