import Border from "./Borders"
import NegativeObject from "./Borders"

const BG_WIDTH = 1165
const BG_HEIGHT = 3990

export default class Negative extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.countCreated = 0

        // this.createBorder()
        this.scene.events.on("leave", ()=>{
            console.log("BORDER leave");
            this.createBorder();
            let border = new Border()
        }, this)
    }
    createBorder() {
        console.log("this.createRoom()")
        
        let border = new Negative(this.scene, this.scene.game.config.width / 2 + 1165 / 2,this.scene.game.config.height, `bg_1`)
        this.add(border)
        border.move()
        this.countCreated++
        console.log("countCreated BORDER: ",this.countCreated)
    }
    // createSecondRoom() {
    //     console.log("this.createSecondRoom()")

    //     let second_room = this.getFirstDead()
    //     if (!second_room) {
    //         console.log("!second_room")
    //         second_room = new Room(this.scene, this.scene.game.config.width / 2 + 1165 / 2, 0, `bg_1`)
    //         this.add(second_room)
    //     } else {
    //         second_room.reset()
    //     }
    //     this.countCreated++
    //     console.log("countCreated: ",this.countCreated)
    //     second_room.move()
    // }

    // // tick() {
    // //     if (this.countCreated < this.countMax) {
    // //         this.createPositiveObject()
    // //         this.timer.delay -= this.scene.countScorePositive * this.config.accelerationFrequency
    // //     } else {
    // //         this.timer.remove()
    // //     }
    // // }
}