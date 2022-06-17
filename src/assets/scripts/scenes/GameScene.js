import Borders from "../classes/Borders";
import Coins from "../classes/Coins";
import Negative from "../classes/Negative";
import Player from "../classes/Player";
import Positive from "../classes/Positive";
import Rooms from "../classes/Rooms";
import Spots from "../classes/Spots";
import UI_elements from "../classes/UI_elements";

const BG_WIDTH = 900
const BG_HEIGHT = 2880
const LEFT_LIMIT = 400;
const RIGHT_LIMIT = 1320;

const GAME_VELOCITY = 3

const SCORE_SPOT = 1
const SCORE_COIN = 3
const SCORE_POSITIVE = 5



export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
    console.log("GameScene")
  }
  init() {
    this.room_num = 1
    this.score = 0
    this.hearts = 3
    console.log("init()", this)

    this.hero = "cat"


    this.count_created_scenes = 0
  }
  preload() {
    console.log("preload()")

    this.load.setBaseURL(document.location.href);

    this.load.image("podskazka", "src/assets/sprites/podskazka.png");


    this.load.image("player_rita_1", "src/assets/sprites/2version/player/player_rita_1.png");
    this.load.atlas(
      "player_rita", "src/assets/sprites/2version/player/player_rita.png", 
      "src/assets/sprites/2version/player/player_rita.json");

    this.load.image("player_cat_1", "src/assets/sprites/2version/player/player_cat_1.png");
    this.load.atlas(
      "player_cat", "src/assets/sprites/2version/player/player_cat.png", 
      "src/assets/sprites/2version/player/player_cat.json");

    this.load.image("border", "src/assets/sprites/2version/border.png");
    this.load.image("border2", "src/assets/sprites/2version/border2.png");
    this.load.image("room1", "src/assets/sprites/2version/room1.jpg");
    this.load.image("room2", "src/assets/sprites/2version/room2.jpg");
    this.load.image("room3", "src/assets/sprites/2version/room3.jpg");
    this.load.image("room5", "src/assets/sprites/2version/room5_2.jpg");
    this.load.image("left_element", "src/assets/sprites/2version/left_element1.jpg");
    this.load.image("right_element", "src/assets/sprites/2version/right_element1.jpg");

    this.load.image("room1_1", "src/assets/sprites/2version/negative/1_1_2.png");
    this.load.image("room1_2", "src/assets/sprites/2version/negative/1_2_2.png");
    this.load.image("room1_3", "src/assets/sprites/2version/negative/1_3_2.png");

    this.load.image("room2_1", "src/assets/sprites/2version/negative/2_1_2.png");
    this.load.image("room2_2", "src/assets/sprites/2version/negative/2_2_2.png");
    this.load.image("room2_3", "src/assets/sprites/2version/negative/2_3_2.png");

    this.load.image("room3_1", "src/assets/sprites/2version/negative/3_1_2.png");
    this.load.image("room3_2", "src/assets/sprites/2version/negative/3_2_2.png");
    this.load.image("room3_3", "src/assets/sprites/2version/negative/3_3_2.png");

    this.load.image("room4_1", "src/assets/sprites/2version/negative/4_1_2.png");
    this.load.image("room4_2", "src/assets/sprites/2version/negative/4_2_2.png");
    this.load.image("room4_3", "src/assets/sprites/2version/negative/4_3_2.png");

    this.load.image("room5_1", "src/assets/sprites/2version/negative/5_1_2.png");
    this.load.image("room5_2", "src/assets/sprites/2version/negative/5_2_2.png");
    this.load.image("room5_3", "src/assets/sprites/2version/negative/5_3_2.png");

    this.load.image("spot_1", "src/assets/sprites/2version/positive/spot1_2.png");
    this.load.image("spot_2", "src/assets/sprites/2version/positive/spot2_2.png");

    this.load.image("coin", "src/assets/sprites/2version/positive/coin_2.png");

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

    this.load.image("hp", "src/assets/sprites/2version/ui/hp.png");
    this.load.image("not_hp", "src/assets/sprites/2version/ui/not_hp.png");
    this.load.image("score_coin", "src/assets/sprites/2version/ui/score_coin.png");
    this.load.image("score_rectangle", "src/assets/sprites/2version/ui/score_rectangle.png");

    
  }
  create() {
    console.log("create()")
    this.game_velocity = GAME_VELOCITY
    let rooms = new Rooms(this)

    this.player = new Player(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2 + 300,
      `player_${this.hero}_1`,
      {"playerScale": 0.7, hero: this.hero}
    )

    this.podskazka = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2 + 100, 'podskazka').setAlpha(0)

    this.border = new Borders(this)
    this.negative = new Negative(this)
    this.positive = new Positive(this)
    this.spots = new Spots(this)
    this.coins = new Coins(this)

    this.ui = new UI_elements(this, 0, 3)

    this.addOverlap()
    

    this.left_element = this.add.tileSprite(0, 0, 510, this.game.config.height, "left_element").setOrigin(0);
    this.right_element = this.add.tileSprite(this.game.config.width - 510, 0, 0, this.game.config.height, "right_element").setOrigin(0);
  }
  update(timestep, dt) {
    this.left_element.tilePositionY -= this.game_velocity
    this.right_element.tilePositionY -= this.game_velocity
  }
  addOverlap() {
    this.physics.add.overlap(
      [this.border, this.negative],
      this.player,
      this.onNegativeOverlap,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.positive,
      this.player,
      this.onPositiveOverlap,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.coins,
      this.player,
      this.onCoinsOverlap,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.spots,
      this.player,
      this.onSpotsOverlap,
      undefined,
      this
    );
  }
  onNegativeOverlap(source, target) { // source - игрок
    target.body.enable = false
    this.cameras.main.shake(500, 0.005)

    console.log("NEGATIVE OVERLAP")

    this.tweens.add({
      targets: source,
      alpha: 0.1,
      repeat: 1,
      ease: "Power2",
      yoyo: true,
      duration: 250,
      onComplete: function () {
        source.alpha = 1;
      },
    });
    this.tweens.add({
      targets: target,
      alpha: {
        from: 1,
        to: 0
      },
      ease: "Power2",
      duration: 350,
      onComplete: function () {
        target.setAlive(false);
        target.alpha = 1
      },
    });

    if (this.hearts === 3){ 
      this.tweens.add({
        targets: this.ui.heart_1,
        scale: {
          from: 1,
          to: 2
        },
        alpha: {
          from: 1,
          to: 0
        },
        ease: "Power2",
        duration: 450,
        onComplete: () => {
          this.ui.heart_1.setTexture('not_hp')
          this.ui.heart_1.alpha = 1
          this.ui.heart_1.scale = 1
        },
      });

      // this.ui.heart_1.setTexture('not_hp')
      this.hearts--
    }
    else if (this.hearts === 2) {
      this.tweens.add({
        targets: this.ui.heart_2,
        scale: {
          from: 1,
          to: 2
        },
        alpha: {
          from: 1,
          to: 0
        },
        ease: "Power2",
        duration: 450,
        onComplete: () => {
          this.ui.heart_2.setTexture('not_hp')
          this.ui.heart_2.alpha = 1
          this.ui.heart_2.scale = 1
        },
      });
      this.hearts--
      // this.ui.heart_2.setTexture('not_hp')
  }
    else if (this.hearts === 1) {
      this.tweens.add({
        targets: this.ui.heart_3,
        scale: {
          from: 1,
          to: 2
        },
        alpha: {
          from: 1,
          to: 0
        },
        ease: "Power2",
        duration: 450,
        onComplete: () => {
          this.ui.heart_3.setTexture('not_hp')
          this.ui.heart_3.alpha = 1
          this.ui.heart_3.scale = 1
        },
      });
      this.hearts--
      // this.ui.heart_3.setTexture('not_hp')
      // this.scene.stop()
      // this.scene.start("Game")
    }
    
  }
  onPositiveOverlap(source, target) {
    target.body.enable = false

    this.tweens.add({
      targets: target,
      scale: {
        from: 1,
        to: 2
      },
      alpha: {
        from: 1,
        to: 0.8
      },
      // y: "-=300",
      ease: "Power2",
      duration: 900,
      onStart: () => {
        // this.children.moveUp(target)        
      },
      onComplete: () => {
        target.setAlive(false);
        target.alpha = 1
        target.scale = 1
        // this.children.moveDown(target)
      },
    });
    // target.setAlive(false);
    this.score += SCORE_POSITIVE
    this.ui.score_text.setText(`${this.score}`);
  }
  onCoinsOverlap(source, target) {
    target.body.enable = false
    this.tweens.add({
      targets: target,
      scale: {
        from: 1,
        to: 2
      },
      alpha: {
        from: 1,
        to: 0
      },
      ease: "Power2",
      duration: 500,
      onComplete: function () {
        target.setAlive(false);
        target.alpha = 1
        target.scale = 1
      },
    });
    // target.setAlive(false);
    this.score += SCORE_COIN
    this.ui.score_text.setText(`${this.score}`);
  }
  onSpotsOverlap(source, target) {
    // this.createScoreAnimation()
    target.body.enable = false
    this.tweens.add({
      targets: target,
      scale: {
        from: 1,
        to: 2
      },
      alpha: {
        from: 1,
        to: 0
      },
      ease: "Power2",
      duration: 500,
      onComplete: function () {
        target.setAlive(false);
        target.alpha = 1
        target.scale = 1
      },
    });
    // target.setAlive(false);
    this.score += SCORE_SPOT
    this.ui.score_text.setText(`${this.score}`);
  }
  // createScoreAnimation() {
  //   this.podskazka.alpha = 1
  //   this.tweens.add({
  //     targets: this.podskazka,
  //     alpha: {
  //       from: 1,
  //       to: 0
  //     },
  //     x: 678,
  //     y: 69,
  //     ease: "Power2",
  //     duration: 3000,
  //     yoyo: true,
  //     onComplete: () => {
  //       this.podskazka.alpha = 0
  //       this.podskazka.x = this.game.config.width / 2
  //       this.podskazka.x = this.game.config.height / 2 + 100
  //     },
  //   });
  // }
}
