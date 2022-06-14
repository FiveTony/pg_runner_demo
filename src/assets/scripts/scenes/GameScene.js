import Borders from "../classes/Borders";
import Coins from "../classes/Coins";
import Negative from "../classes/Negative";
import Player from "../classes/Player";
import Positive from "../classes/Positive";
import Rooms from "../classes/Rooms";
import Spots from "../classes/Spots";

const BG_WIDTH = 900
const BG_HEIGHT = 2880
const LEFT_LIMIT = 400;
const RIGHT_LIMIT = 1320;

const GAME_VELOCITY = 4



export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
    console.log("GameScene")
  }
  init() {
    this.room_num = 1

    this.count_created_scenes = 0
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
    this.load.image("room3", "src/assets/sprites/2version/room3.jpg");
    this.load.image("room5", "src/assets/sprites/2version/room5.jpg");
    this.load.image("left_element", "src/assets/sprites/2version/left_element1.jpg");
    this.load.image("right_element", "src/assets/sprites/2version/right_element1.jpg");

    this.load.image("room1_1", "src/assets/sprites/2version/negative/1_1.png");
    this.load.image("room1_2", "src/assets/sprites/2version/negative/1_2.png");
    this.load.image("room1_3", "src/assets/sprites/2version/negative/1_3.png");

    this.load.image("room2_1", "src/assets/sprites/2version/negative/2_1.png");
    this.load.image("room2_2", "src/assets/sprites/2version/negative/2_2.png");
    this.load.image("room2_3", "src/assets/sprites/2version/negative/2_3.png");

    this.load.image("room3_1", "src/assets/sprites/2version/negative/3_1.png");
    this.load.image("room3_2", "src/assets/sprites/2version/negative/3_2.png");
    this.load.image("room3_3", "src/assets/sprites/2version/negative/3_3.png");

    this.load.image("room4_1", "src/assets/sprites/2version/negative/4_1.png");
    this.load.image("room4_2", "src/assets/sprites/2version/negative/4_2.png");
    this.load.image("room4_3", "src/assets/sprites/2version/negative/4_3.png");

    this.load.image("room5_1", "src/assets/sprites/2version/negative/5_1.png");
    this.load.image("room5_2", "src/assets/sprites/2version/negative/5_2.png");
    this.load.image("room5_3", "src/assets/sprites/2version/negative/5_3.png");

    this.load.image("spot_1", "src/assets/sprites/2version/positive/spot1.png");
    this.load.image("spot_2", "src/assets/sprites/2version/positive/spot2.png");

    this.load.image("coin", "src/assets/sprites/2version/positive/coin.png");

    this.load.image("positive1", "src/assets/sprites/2version/positive/positive1.png");
    this.load.image("positive2", "src/assets/sprites/2version/positive/positive2.png");
    this.load.image("positive3", "src/assets/sprites/2version/positive/positive3.png");
    this.load.image("positive4", "src/assets/sprites/2version/positive/positive4.png");
    this.load.image("positive5", "src/assets/sprites/2version/positive/positive5.png");
    this.load.image("positive6", "src/assets/sprites/2version/positive/positive6.png");
    this.load.image("positive7", "src/assets/sprites/2version/positive/positive7.png");
    this.load.image("positive8", "src/assets/sprites/2version/positive/positive8.png");
    this.load.image("positive9", "src/assets/sprites/2version/positive/positive9.png");
    this.load.image("positive10", "src/assets/sprites/2version/positive/positive10.png");
    this.load.image("positive11", "src/assets/sprites/2version/positive/positive11.png");

  }
  create() {
    this.game_velocity = GAME_VELOCITY
    let rooms = new Rooms(this)

    this.player = new Player(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2 + 100,
      "player1_1",
      {"playerScale": 0.7}
    )

    let border = new Borders(this)
    let negative = new Negative(this)
    let positive = new Positive(this)
    let spots = new Spots(this)
    let coins = new Coins(this)

    this.left_element = this.add .tileSprite(0, 0, 510, this.game.config.height, "left_element").setOrigin(0);
    this.right_element = this.add .tileSprite(this.game.config.width - 510, 0, 0, this.game.config.height, "right_element").setOrigin(0);
  }
  update(timestep, dt) {
    this.left_element.tilePositionY -= this.game_velocity
    this.right_element.tilePositionY -= this.game_velocity
  }

}
