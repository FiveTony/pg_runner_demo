const TEXT_STYLE = {
    font: '50px Monserrat-Bold',
    fill: '#FFFFFF'
}

const WIDTH = 1920
const HEIGHT = 1080

export default class UI_elements {
    constructor(scene, score, hearts) {
        this.scene = scene
        this.score = score
        this.hearts = hearts
        this.createStats()
        this.createHearts()
        this.createSoundButtons()
    }
    createStats() {
        this.scene.add.sprite(85, 40, "ui_spritesheet", 'score_rectangle')
        this.scene.add.sprite(46, 40, "ui_spritesheet", 'score_coin')
        // this.score_text = this.scene.add.text(690, 42, `${this.score}`, TEXT_STYLE)
        this.score_text = this.scene.add.bitmapText(86, 22, 'Montserrat-Bold', `${this.score}`, 30)
    }
    createHearts() {
        this.heart_1 = this.scene.add.sprite(225, 40, "ui_spritesheet", 'hp')
        this.heart_2 = this.scene.add.sprite(280, 40, "ui_spritesheet", 'hp')
        this.heart_3 = this.scene.add.sprite(335, 40, "ui_spritesheet", 'hp')
    }
    createSoundButtons() {
        this.sound = this.scene.add.sprite(455, 40, "ui_spritesheet", 'musicOn').setInteractive()
    }

}