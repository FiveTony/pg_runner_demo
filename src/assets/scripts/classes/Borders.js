const BG_WIDTH = 900
const BG_HEIGHT = 2880

export default class Borders extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.left_x = this.scene.game.config.width / 2 - 246
        this.right_x = this.scene.game.config.width / 2 + 246

        this.scene.events.on("leave", ()=>{
            // console.log("BORDER leave", this.scene.events.listenerCount("update"));
            this.createBorder();
        }, this)
    }
    createBorder() {
        if (this.scene.room_num !== 1) {
            let y = -26
        // let left_border = this.getFirstDead()
        // let right_border = this.getFirstDead()
        // if (!left_border) {
            let left_border = new Border(this.scene, this.left_x, y, `border`)
            this.add(left_border)
        // } 
        // else left_border.reset(this.scene.game.config.width / 2 - 700 / 2)
        // if (!right_border) {
            let right_border = new Border(this.scene, this.right_x, y, `border`)
            this.add(right_border)
        // } 
        // else right_border.reset(this.scene.game.config.width / 2 + 900 / 2)
        left_border.move()
        right_border.move()
        }
        //  console.log("createBorder()",this.scene.events.listenerCount("update"), this.scene.events.listeners("update"))
    }
}

class Border extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture) {
        super(scene, x, y, texture)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.enable = true
        // this.setScale(2)
        this.init()
        // this.scene.children.moveDown(this)
    }
    init() {
        this.scene.events.on('update', this.update, this)
    }
    update(timestep, dt) {
        if (this.y > 1098){
            // this.setAlive(false)
            this.destroy()
        } 
        this.y += this.velocityY
    }
    // setAlive(status) {   
    //     this.body.enable = status  
    //     this.setVisible(status)
    //     this.setActive(status)
    // }
    // reset(x) {
    //     console.log("BORDER reset()",this.scene.events.listenerCount("update"))
    //     // this.scene.children.moveDown(this)
    //     console.log(x)
    //     this.x = x
    //     this.y = 0
    //     this.setAlive(true)
    // }
    move() {
        this.velocityY = this.scene.game_velocity
    }
}