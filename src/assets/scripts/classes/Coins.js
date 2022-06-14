const BG_WIDTH = 900
const BG_HEIGHT = 2880

const DATA = [
    [365, -600, 'spot_1'],
    [1320, -8000, 'spot_2'],
    [1350, -1600, 'spot_1'],
    [400, -920, 'spot_2'],
    [1120, -900, 'spot_1'],
    [800, -1200, 'spot_2'],
    [865, -600, 'spot_2'],
    [1120, -1400, 'spot_1'],
    [1050, -1100, 'spot_2'],
    [865, -800, 'spot_2'],
    [1020, -700, 'spot_1'],
    [950, -1100, 'spot_2'],
    [865, -1200, 'spot_1'],
    [720, -800, 'spot_2'],
    [950, -1100, 'spot_2'],
]

export default class Coins extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.count_created = 0
        this.createFirstElements()

        this.scene.events.on("leave", ()=>{
            if (this.scene.count_created_scenes > 2 ) {
                if (this.count_created === 15) this.count_created = 0
                this.createCoin()
                this.createCoin()
                this.createCoin()
            }
        }, this)
    }
    createFirstElements() {
        let data_1 = DATA[0]
        let elem_1 = new Coin(this.scene, 465, 300, 'coin')
        elem_1.move()
        this.add(elem_1)

        let data_2 = DATA[1]
        let elem_2 = new Coin(this.scene, 1420, -600, 'coin')
        elem_2.move()
        this.add(elem_2)

        let data_3 = DATA[2]
        let elem_3 = new Coin(this.scene, 1050, -400, 'coin')
        elem_3.move()
        this.add(elem_3)

        let data_4 = DATA[3]
        let elem_4 = new Coin(this.scene, 900, -2420, 'coin')
        elem_4.move()
        this.add(elem_4)

        let data_5 = DATA[4]
        let elem_5 = new Coin(this.scene, 920, -3500, 'coin')
        elem_5.move()
        this.add(elem_5)

        let data_6 = DATA[5]
        let elem_6 = new Coin(this.scene, 1000, -3400, 'coin')
        elem_6.move()
        this.add(elem_6)

        this.count_created = 6
    }
    createCoin() {
        let data = DATA[this.count_created]
        let elem = this.getFirstDead()
        if (!elem) {
            console.log("!elem________")
            elem = new Spot(this.scene, data[0], data[1], 'coin')
        } else elem.reset(data[0], data[1], 'coin')
        this.count_created++
        }
    }


class Coin extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture) {
        super(scene, x, y, texture)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.enable = true
        this.alive_status = true
        this.init()
    }
    init() {
        this.scene.events.on('update', this.update, this)
    }
    update(timestep, dt) {
        if (this.y > 1200 && this.alive_status){
            this.setAlive(false)
        } 
        this.y += this.velocityY
    }
    setAlive(status) {   
        this.alive_status = status
        this.body.enable = status  
        this.setVisible(status)
        this.setActive(status)
    }
    reset(x, y, sprite) {
        this.x = x
        this.y = y
        this.setTexture(sprite)
        this.setAlive(true)

        // this.scene.children.bringToTop(this)
        
    }
    move() {
        this.velocityY = this.scene.game_velocity
    }
}