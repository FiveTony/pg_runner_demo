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

export default class Positive extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.count_created = 0
        this.createFirstElements()

        this.scene.events.on("leave", ()=>{
            if (this.scene.count_created_scenes > 2 ) {
                if (this.count_created === 15) this.count_created = 0
                this.createPositiveObject()
                this.createPositiveObject()
                this.createPositiveObject()
            }
        }, this)
    }
    createFirstElements() {
        let data_1 = DATA[0]
        let elem_1 = new PositiveObject(this.scene, 565, 1300, 'positive1')
        elem_1.move()
        this.add(elem_1)

        let data_2 = DATA[1]
        let elem_2 = new PositiveObject(this.scene, 1520, -1200, 'positive2')
        elem_2.move()
        this.add(elem_2)

        let data_3 = DATA[2]
        let elem_3 = new PositiveObject(this.scene, 1150, -900, 'positive3')
        elem_3.move()
        this.add(elem_3)

        let data_4 = DATA[3]
        let elem_4 = new PositiveObject(this.scene, 800, -2220, 'positive4')
        elem_4.move()
        this.add(elem_4)

        let data_5 = DATA[4]
        let elem_5 = new PositiveObject(this.scene, 820, -3800, 'positive5')
        elem_5.move()
        this.add(elem_5)

        let data_6 = DATA[5]
        let elem_6 = new PositiveObject(this.scene, 900, -3600, 'positive6')
        elem_6.move()
        this.add(elem_6)

        this.count_created = 6
    }
    createPositiveObject() {
        let data = DATA[this.count_created]
        let elem = this.getFirstDead()    
        let num = Phaser.Math.Between(1,11)
        if (!elem) {
            console.log("!elem________")
            elem = new PositiveObject(this.scene, data[0], data[1], `positive${num}`)
        } else elem.reset(data[0], data[1], `positive${num}`)
        this.count_created++
        }
    }


class PositiveObject extends Phaser.GameObjects.Sprite {
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
    }
    move() {
        this.velocityY = this.scene.game_velocity
    }
}