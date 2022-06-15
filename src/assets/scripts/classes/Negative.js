const BG_WIDTH = 900
const BG_HEIGHT = 2880

const DATA = [
    [665, -600, 'room1_1'],
    [1220, -1200, 'room1_2'],
    [1250, -1700, 'room1_3'],
    [700, -620, 'room2_1'],
    [1220, -700, 'room2_2'],
    [800, -900, 'room2_3'],

    [670, -950, 'room3_1'],
    [802, -1800, 'room3_2'],
    [703, -2500, 'room3_3'],
    [665, -400, 'room4_1'],
    [1220, -600, 'room4_2'],
    [1250, -1300, 'room4_3'],
    [665, -400, 'room5_1'],
    [1220, -600, 'room5_2'],
    [1250, -1300, 'room5_3'],
]



export default class Negative extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.count_created = 0
        this.createFirstElements()

        this.scene.events.on("leave", ()=>{
            if (this.scene.count_created_scenes > 2 ) {
                // console.log(this.scene.events.listenerCount("update"), this.scene.children.getAll())
                if (this.count_created === 15) this.count_created = 0
                this.createNextNegative()
                this.createNextNegative()
                this.createNextNegative()
            }
        }, this)
    }
    createFirstElements() {
        let data_1 = DATA[0]
        let elem_1 = new NegativeObject(this.scene, 665, 100, 'room1_1')
        elem_1.move()
        this.add(elem_1)

        let data_2 = DATA[1]
        let elem_2 = new NegativeObject(this.scene, 1220, -700, 'room1_2')
        elem_2.move()
        this.add(elem_2)

        let data_3 = DATA[2]
        let elem_3 = new NegativeObject(this.scene, 1270, -1250, 'room1_3')
        elem_3.move()
        this.add(elem_3)

        let data_4 = DATA[3]
        let elem_4 = new NegativeObject(this.scene, 700, -2330, 'room2_1')
        elem_4.move()
        this.add(elem_4)

        let data_5 = DATA[4]
        let elem_5 = new NegativeObject(this.scene, 1220, -3300, 'room2_2')
        elem_5.move()
        this.add(elem_5)

        let data_6 = DATA[5]
        let elem_6 = new NegativeObject(this.scene, 700, -4000, 'room2_3')
        elem_6.move()
        this.add(elem_6)

        this.count_created = 6
    }
    createNextNegative() {
        let data = DATA[this.count_created]
        let elem = this.getFirstDead()
        if (!elem) {
            console.log("!elem________")
            elem = new NegativeObject(this.scene, data[0], data[1], data[2])
        } else {
            elem.reset(data[0], data[1], data[2])
        }
        this.count_created++
        }
    }


class NegativeObject extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture) {
        super(scene, x, y, texture)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.enable = true
        this.init()
        this.alive_status = true
    }
    init() {
        this.scene.events.on('update', this.update, this)
    }
    update(timestep, dt) {
        if (this.y > 1500 && this.alive_status){
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

        this.scene.children.bringToTop(this)
        
    }
    move() {
        this.velocityY = this.scene.game_velocity
    }
}