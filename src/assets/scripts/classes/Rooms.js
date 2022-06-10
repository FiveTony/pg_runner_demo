import Room from "./Room"

const BG_WIDTH = 900
const BG_HEIGHT = 2880

export default class Rooms extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.countCreated = 0
        this.room_num = 1

        this.createRoom()
        this.scene.events.on("leave", ()=>{
            console.log("leave");
            this.createSecondRoom();
            this.scene.children.bringToTop(this.scene.player)

        }, this)
    }
    createRoom() {       
        let first_room = new Room(this.scene, this.scene.game.config.width / 2 + BG_WIDTH / 2,this.scene.game.config.height, `room1`)
        this.add(first_room)
        first_room.move()
        this.countCreated++
        this.room_num++
    }
    createSecondRoom() {
        let second_room = this.getFirstDead()
        if (!second_room) {
            second_room = new Room(this.scene, this.scene.game.config.width / 2 + BG_WIDTH / 2, 0, "room2")
            this.add(second_room)
        } else {
            let room_sprite
            if ((this.room_num) % 5 === 0) {
                room_sprite = "room5"
                this.room_num = 0
            }
            else if ((this.room_num) % 2 === 0) room_sprite = "room2"
            else room_sprite = "room1"
            console.log(this.countCreated, this.room_num , room_sprite)
            second_room.reset(room_sprite)
        }
        this.countCreated++
        this.room_num++
        second_room.move()
    }
}