import Borders from "../classes/Borders";
import Player from "../classes/Player";
import Rooms from "../classes/Rooms";

const BG_WIDTH = 900
const BG_HEIGHT = 2880
const LEFT_LIMIT = 400;
const RIGHT_LIMIT = 1320;

const GAME_VELOCITY = 10

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
    console.log("GameScene")
  }
  init() {
    
  }
  preload() {
    this.load.setBaseURL(document.location.href);
    this.load.image("bg", "src/assets/sprites/3.png");
    this.load.image("player", "src/assets/sprites/player2.png");
    this.load.image("bg_1", "src/assets/sprites/1_1.png");
    this.load.image("bg_2", "src/assets/sprites/1_2.png");
    this.load.image("player1_1", "src/assets/sprites/player1_1.png");
    this.load.image("border", "src/assets/sprites/2version/border.png");
    this.load.image("room1", "src/assets/sprites/2version/room1.jpg");
    this.load.image("room2", "src/assets/sprites/2version/room2.jpg");
    this.load.image("room5", "src/assets/sprites/2version/room5.jpg");
    this.load.image("left_element", "src/assets/sprites/2version/left_element1.jpg");
    this.load.image("right_element", "src/assets/sprites/2version/right_element1.jpg");
  }
  create() {
    this.game_velocity = GAME_VELOCITY
    let rooms = new Rooms(this)

    this.player = new Player(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2 + 100,
      "player1_1",{"playerScale": 0.7}
    )

    let border = new Borders(this)

    this.left_element = this.add .tileSprite(0, 0, 510, this.game.config.height, "left_element").setOrigin(0);
    this.right_element = this.add .tileSprite(this.game.config.width - 510, 0, 0, this.game.config.height, "right_element").setOrigin(0);
    console.log(this.game.config.width - 430 - 430)
  }
  update(timestep, dt) {
    this.left_element.tilePositionY -= this.game_velocity
    this.right_element.tilePositionY -= this.game_velocity
  }

}
