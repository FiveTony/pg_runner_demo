const BG_WIDTH = 900    
const BG_HEIGHT = 2880

export default class Room extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture) {
        super(scene, x, y, texture)
        console.log(this.width, this.height)
        this.init()
        this.setOrigin(1)

        this.leave_flag = false
        this.destroy_flag = false
    }
    init() {
        this.scene.add.existing(this)
        this.scene.events.on('update', this.update, this)
        // this.scene.children.moveDown(this)
        console.log(this.scene.children.getAll())
    }
    update(timestep, dt) {
        if (this.y > BG_HEIGHT - 1 + this.scene.game.config.height && (!this.destroy_flag)) {
            this.setAlive(false)
            this.destroy_flag = !this.destroy_flag
            // console.log("DESTROY", this.scene.events.listenerCount("leave"))
        } else if ((this.y > BG_HEIGHT - 1) && (!this.leave_flag)) {
            // console.log("LEAVE")
            // console.log("СЛУШАТЕЛЕЙ leave: ", this.scene.events.listenerCount("leave"))
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
        console.log()
        // this.scene.children.moveDown(this)
        console.log(this.scene.children.getAll())

        this.leave_flag = false
        this.destroy_flag = false
        this.x = this.scene.game.config.width / 2 + BG_WIDTH / 2
        this.y = 0
        this.setAlive(true)
        this.setTexture(room_sprite)
    }
    move() {
        this.velocityY = this.scene.game_velocity
    }
    isDead() {
        return this.y > BG_HEIGHT - 1
    }
    isLeave() {
        return this.y > BG_HEIGHT - 1 - this.scene.game.config.height
    }
}