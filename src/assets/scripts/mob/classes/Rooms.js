import Room from "./Room"

const BG_WIDTH = 340
const BG_HEIGHT = 1100

const WIDTH = 500
const HEIGHT = 800

export default class Rooms extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene

        this.countCreated = 0

        this.createFirstRoom()
        this.scene.events.on("leave", ()=>{
            // console.log("leave",this.scene.room_num);
            this.createSecondRoom();

            // this.scene.children.bringToTop(this.scene.player)
            // this.scene.children.bringToTop(this.scene.ui)
        }, this)
    }
    createFirstRoom() {     
        let first_room = new Room(this.scene, WIDTH / 2 + BG_WIDTH / 2, HEIGHT, "room1")
        // console.log(first_room.y)
        this.add(first_room)
        first_room.move()
        this.countCreated++
        this.scene.room_num++
        this.scene.count_created_scenes++
    }
    createSecondRoom() {
        let second_room = this.getFirstDead()
        if (!second_room) {
            // console.log("!second_room")
            second_room = new Room(this.scene, WIDTH / 2 + BG_WIDTH / 2, 0, "room2")
            this.add(second_room)
            // console.log(second_room.y)
        } else {
            // console.log("reset()")
            let room_sprite
            if (this.scene.room_num === 5) {
                room_sprite = "room5"
                this.scene.room_num = 0
            }
            else if (this.scene.room_num === 2) room_sprite = "room2"
            else if (this.scene.room_num === 3) room_sprite = "room3"
            else if (this.scene.room_num === 4) room_sprite = "room4"
            else room_sprite = "room1"
            second_room.reset(room_sprite)
        }
        this.countCreated++
        this.scene.room_num++
        this.scene.count_created_scenes++
        second_room.move()
    }
}