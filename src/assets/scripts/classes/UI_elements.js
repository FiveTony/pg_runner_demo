const TEXT_STYLE = {
    font: '50px BalsamiqSans',
    fill: '#FFFFFF'
}

export default class UI_elements {
    constructor(scene, score, hearts) {
        this.scene = scene
        this.score = score
        this.hearts = hearts
        this.createStats()
        this.createHearts()
    }
    createStats() {
        this.scene.add.sprite(678, 69, 'score_rectangle')
        this.scene.add.sprite(622, 68, 'score_coin')
        this.score_text = this.scene.add.text(702, 44, `${this.score}`, TEXT_STYLE)

        // this.graphicsHearts = this.scene.add.graphics().fillStyle(0xFFC700, 1).setDepth(1)
        // this.graphicsHearts.fillRoundedRect(294, 24, 82, 42, 10)
        // this.heartsImg = this.scene.add.sprite(274, 24, 'hearts').setOrigin(0).setDepth(1)
        // this.rect4 = this.scene.add.text(330, 32, `${this.hearts}`, TEXT_STYLE).setDepth(1)
    }
    createHearts() {
        this.heart_1 = this.scene.add.sprite(1126, 66, 'hp')
        this.heart_2 = this.scene.add.sprite(1216, 66, 'hp')
        this.heart_3 = this.scene.add.sprite(1308, 66, 'hp')
    }


}