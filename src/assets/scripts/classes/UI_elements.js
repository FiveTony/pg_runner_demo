const TEXT_STYLE = {
    font: '47px BalsamiqSans',
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
        this.scene.add.sprite(562, 24, 'score_rectangle').setOrigin(0).setDepth(1)
        this.scene.add.sprite(586, 34, 'score_coin').setOrigin(0).setDepth(1)
        this.score_text = this.scene.add.text(710, 70, `${this.score}`, TEXT_STYLE).setDepth(1).setOrigin(0.5)

        // this.graphicsHearts = this.scene.add.graphics().fillStyle(0xFFC700, 1).setDepth(1)
        // this.graphicsHearts.fillRoundedRect(294, 24, 82, 42, 10)
        // this.heartsImg = this.scene.add.sprite(274, 24, 'hearts').setOrigin(0).setDepth(1)
        // this.rect4 = this.scene.add.text(330, 32, `${this.hearts}`, TEXT_STYLE).setDepth(1)
    }
    createHearts() {
        this.heart_1 = this.scene.add.sprite(1058, 6, 'hp').setOrigin(0).setDepth(1)
        this.heart_2 = this.scene.add.sprite(1152, 6, 'hp').setOrigin(0).setDepth(1)
        this.heart_3 = this.scene.add.sprite(1246, 6, 'hp').setOrigin(0).setDepth(1)
    }


}