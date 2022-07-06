const BG_WIDTH = 340
const BG_HEIGHT = 1100

const WIDTH = 500
const HEIGHT = 800

const GAME_VELOCITY_STEP = 0.2


export default class Room extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture) {
        super(scene, x, y, texture)
        this.init()
        this.scene.children.sendToBack(this)
    }
    init() {
        this.setOrigin(1)
    
        this.leave_flag = false
        this.destroy_flag = false
        this.scene.add.existing(this)
        this.scene.events.on('update', this.update, this)
        this.scene.events.on('start_game', this.move, this)
        this.scene.events.on('leave', this.move, this)

        this.delta = 10
    }
    update(timestep, dt) {
        if (this.y > BG_HEIGHT - 1 + HEIGHT && (!this.destroy_flag)) {
            this.setAlive(false)
            this.destroy_flag = !this.destroy_flag
        } else if ((this.y > BG_HEIGHT - this.delta) && (!this.leave_flag)) {
            if (this.scene.game_velocity < 9) {
                this.scene.game_velocity += GAME_VELOCITY_STEP
                this.delta += 0.4
            }
            // console.log("leave  ",this.y, "this.scene.game_velocity   ", this.scene.game_velocity, "delta   ", this.delta, "this.y - BG_HEIGHT  ", this.y - BG_HEIGHT)
            this.scene.events.emit("leave")
            this.leave_flag = !this.leave_flag       
        } 
        
        this.y += this.velocityY
    }
    setAlive(status) {     
        this.setVisible(status)
        this.setActive(status)
    }
    reset(room_sprite) {
        this.leave_flag = false
        this.destroy_flag = false
        this.x = WIDTH / 2 + BG_WIDTH / 2
        this.y = 0
        this.setAlive(true)
        this.setTexture(room_sprite)
        this.scene.children.sendToBack(this)
    }
    move() {
        this.velocityY = this.scene.game_velocity
    }
}