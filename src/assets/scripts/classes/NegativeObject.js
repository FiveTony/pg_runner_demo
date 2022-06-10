const BG_WIDTH = 1165
const BG_HEIGHT = 3990

export default class NegativeObject extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture) {
        super(scene, x, y, texture)
        // console.log(this, x, y, texture)
        this.init()
        this.setOrigin(1)

        this.leave_flag = false
        this.destroy_flag = false
    }
    init() {
        this.scene.add.existing(this)
        this.scene.events.on('update', this.update, this)
    }
    update(timestep, dt) {
        if (this.y > BG_HEIGHT - 10 + 1080 && (!this.destroy_flag)) {
            this.setAlive(false)
            this.destroy_flag = !this.destroy_flag
            // console.log("DESTROY", this.scene.events.listenerCount("leave"))
        } 
        // else if ((this.y > BG_HEIGHT - 10) && (!this.leave_flag)) {
        //     console.log("LEAVE")
        //     console.log("СЛУШАТЕЛЕЙ leave: ", this.scene.events.listenerCount("leave"))
        //     this.scene.events.emit("leave")
        //     this.leave_flag = !this.leave_flag
        // }
        
        this.y += this.velocityY
    }
    setAlive(status) {
        // this.destroy()
        this.setVisible(status)
        this.setActive(status)
    }
    reset() {
        console.log("reset()")
        this.leave_flag = false
        this.destroy_flag = false
        this.x = this.scene.game.config.width / 2 + 1165 / 2
        this.y = 0
        this.setAlive(true)
        // this.setTexture("bg_2")
    }
    move() {
        this.velocityY = 8
    }
    isDead() {
        return this.y > BG_HEIGHT - 10
    }
    isLeave() {
        return this.y > BG_HEIGHT - 10 - 1080
    }
}