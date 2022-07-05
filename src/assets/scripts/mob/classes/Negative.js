const BG_WIDTH = 340
const BG_HEIGHT = 1100

const DATA = [
    [150, -340, 'room1_1'],
    [350, -640, 'room1_2'],
    [350, -900, 'room1_3'],
    
    [146, -250, 'room2_1'],
    [350, -550, 'room2_2'],
    [150, -800, 'room2_3'],

    [150, -280, 'room3_1'],
    [184, -600, 'room3_2'],
    [150, -960, 'room3_3'],

    [150, -400, 'room4_1'],
    [150, -680, 'room4_2'],
    [148, -990, 'room4_3'],

    [356, -140, 'room5_1'],
    [148, -600, 'room5_2'],
    [358, -920, 'room5_3'],
]



export default class Negative extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.count_created = 0
        this.createFirstElements()

        this.scene.events.on("leave", ()=>{
            if (this.scene.count_created_scenes > 2 ) {
                if (this.count_created === 15) this.count_created = 0
                this.createNextNegative()
                this.createNextNegative()
                this.createNextNegative()
            }
        }, this)
    }
    createFirstElements() {
        let data_1 = DATA[0]
        let elem_1 = new NegativeObject(this.scene, 146, 320, 'negative_spritesheet', 'room1_1')
        elem_1.move()
        this.add(elem_1)

        let data_2 = DATA[1]
        let elem_2 = new NegativeObject(this.scene, 358, 170, 'negative_spritesheet', 'room1_2')
        elem_2.move()
        this.add(elem_2)

        let data_3 = DATA[2]
        let elem_3 = new NegativeObject(this.scene, 366, -100, 'negative_spritesheet', 'room1_3')
        elem_3.move()
        this.add(elem_3)

        let data_4 = DATA[3]
        let elem_4 = new NegativeObject(this.scene, 144, -560, 'negative_spritesheet', 'room2_1')
        elem_4.move()
        this.add(elem_4)

        let data_5 = DATA[4]
        let elem_5 = new NegativeObject(this.scene, 350, -1000, 'negative_spritesheet', 'room2_2')
        elem_5.move()
        this.add(elem_5)

        let data_6 = DATA[5]
        let elem_6 = new NegativeObject(this.scene, 152, -1200, 'negative_spritesheet', 'room2_3')
        elem_6.move()
        this.add(elem_6)

        this.count_created = 6
    }
    createNextNegative() {
        
        let data = DATA[this.count_created]
        let elem = this.getFirstDead()
        if (!elem) {
            console.log("!elem________")
            elem = new NegativeObject(this.scene, data[0], data[1], 'negative_spritesheet', data[2])
        } else {
            // console.log(data[0], data[1], data[2])
            elem.reset(data[0], data[1], data[2])
        }
        this.count_created++
        }
    }


class NegativeObject extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture, frame) {
        super(scene, x, y, texture, frame)
        this.init()
    }
    init() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.enable = true
        this.alive_status = true
    
        this.body.height = this.height
        this.body.width = this.width
        this.scene.events.on('update', this.update, this)
        this.scene.events.on('start_game', this.move, this)
        this.scene.events.on('leave', this.move, this)
    }
    update(timestep, dt) {
        if (this.y > 930 && this.alive_status){
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
    reset(x, y, frame) {
        this.x = x
        this.y = y
        this.setFrame(frame)
        this.setAlive(true)
        this.body.width = this.width
        this.body.height = this.height

        // this.scene.children.bringToTop(this)
        
    }
    move() {
        this.velocityY = this.scene.game_velocity
    }
}