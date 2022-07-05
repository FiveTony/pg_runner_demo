const X_1 = 150
const X_2 = 250
const X_3 = 350

const BG_WIDTH = 340
const BG_HEIGHT = 1100

const WIDTH = 500
const HEIGHT = 800

const DATA = [
    [X_2, -150],
    [X_3, -460],
    [X_1, -600],
    [X_2, -700],
    
    [X_2, -40],
    [X_2, -250],
    [X_1, -460],
    [X_2, -880],

    [X_2, -360],
    [X_3, -570],
    [X_3, -750],
    [X_2, -960],

    [X_2, -160],
    [X_3, -360],
    [X_3, -890],
    [X_2, -990],

    [X_2, -260],
    [X_3, -400],
    [X_2, -800],
    [X_3, -600],
    // [X_2, -1200],
    // [X_3, -800],
]


export default class Coins extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.count_created = 0
        this.createFirstElements()

        this.scene.events.on("leave", ()=>{
            if (this.scene.count_created_scenes > 2 ) {
                if (this.count_created === 20) this.count_created = 0
                this.createCoin()
                this.createCoin()
                this.createCoin()
                this.createCoin()
            }
        }, this)
    }
    createFirstElements() {
        let data_1 = DATA[0]
        let elem_1 = new Coin(this.scene, X_2, 500, 'positive_spritesheet', "coin")
        elem_1.move()
        this.add(elem_1)

        let data_2 = DATA[1]
        let elem_2 = new Coin(this.scene, X_3, 300, 'positive_spritesheet', "coin")
        elem_2.move()
        this.add(elem_2)

        let data_3 = DATA[2]
        let elem_3 = new Coin(this.scene, X_1, 100, 'positive_spritesheet', "coin")
        elem_3.move()
        this.add(elem_3)

        let data_4 = DATA[3]
        let elem_4 = new Coin(this.scene, X_2, -100, 'positive_spritesheet', "coin")
        elem_4.move()
        this.add(elem_4)

        let data_5 = DATA[4]
        let elem_5 = new Coin(this.scene, X_2, -350, 'positive_spritesheet', "coin")
        elem_5.move()
        this.add(elem_5)

        let data_6 = DATA[5]
        let elem_6 = new Coin(this.scene, X_2, -550, 'positive_spritesheet', "coin")
        elem_6.move()
        this.add(elem_6)

        let data_7 = DATA[5]
        let elem_7 = new Coin(this.scene, X_1, -880, 'positive_spritesheet', "coin")
        elem_7.move()
        this.add(elem_7)

        let data_8 = DATA[5]
        let elem_8 = new Coin(this.scene, X_2, -1090, 'positive_spritesheet', "coin")
        elem_8.move()
        this.add(elem_8)

        this.count_created = 8
    }
    createCoin() {
        let data = DATA[this.count_created]
        let elem = this.getFirstDead()
        if (!elem) {
            console.log("!elem________")
            elem = new Coin(this.scene, data[0], data[1], 'positive_spritesheet', "coin")
        } else elem.reset(data[0], data[1])
        this.count_created++
        }
    }


class Coin extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture, frame) {
        super(scene, x, y, texture, frame)
        this.init()
    }
    init() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.enable = true
        this.alive_status = true
        this.scene.events.on('update', this.update, this)
        this.scene.events.on('start_game', this.move, this)
        this.scene.events.on('leave', this.move, this)
    }
    update(timestep, dt) {
        if (this.y > 850 && this.alive_status){
            this.setAlive(false)
        } 
        this.y += this.velocityY
        this.angle += this.myRotate
    }
    setAlive(status) {   
        this.alive_status = status
        this.body.enable = status  
        this.setVisible(status)
        this.setActive(status)
    }
    reset(x, y) {
        this.x = x
        this.y = y
        this.setAlive(true)        
    }
    move() {
        this.velocityY = this.scene.game_velocity
        this.myRotate = 0.5
    }
}