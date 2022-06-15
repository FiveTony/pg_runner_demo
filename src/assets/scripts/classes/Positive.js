const BG_WIDTH = 900
const BG_HEIGHT = 2880

const X_1 = 700
const X_2 = 975
const X_3 = 1250

const DATA = [
    [X_3, -600],
    [X_1, -8000],
    [X_1, -1600],
    [X_2, -920],
    [X_2, -900],
    [X_2, -1200],

    [X_2, -850],
    [X_2, -1050],
    [X_3, -2300],
    [X_2, -800],
    [X_3, -700],
    [X_3, -1100]
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
        let elem_1 = new PositiveObject(this.scene, X_3, 100, 'positive1')
        elem_1.move()
        this.add(elem_1)

        let data_2 = DATA[1]
        let elem_2 = new PositiveObject(this.scene, X_1, -1500, 'positive2')
        elem_2.move()
        this.add(elem_2)

        let data_3 = DATA[2]
        let elem_3 = new PositiveObject(this.scene, X_1, -3020, 'positive3')
        elem_3.move()
        this.add(elem_3)

        let data_4 = DATA[3]
        let elem_4 = new PositiveObject(this.scene, X_2, -4400, 'positive4')
        elem_4.move()
        this.add(elem_4)

        let data_5 = DATA[4]
        let elem_5 = new PositiveObject(this.scene, X_2, -5800, 'positive5')
        elem_5.move()
        this.add(elem_5)

        let data_6 = DATA[5]
        let elem_6 = new PositiveObject(this.scene, X_2, -6300, 'positive6')
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