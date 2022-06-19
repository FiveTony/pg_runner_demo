import Borders from "../classes/Borders";
import Coins from "../classes/Coins";
import Negative from "../classes/Negative";
import Player from "../classes/Player";
import Positive from "../classes/Positive";
import Rooms from "../classes/Rooms";
import Spots from "../classes/Spots";
import UI_elements from "../classes/UI_elements";

// const BG_WIDTH = 900
// const BG_HEIGHT = 2880
// const LEFT_LIMIT = 400;
// const RIGHT_LIMIT = 1320;

const WIDTH = 1920
const HEIGHT = 1080

const GAME_VELOCITY = 3

const SCORE_SPOT = 1
const SCORE_COIN = 3
const SCORE_POSITIVE = 5



export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
    console.log("GameScene")
  }
  init(data) {
    this.room_num = 1
    this.score = 0
    this.hearts = 3

    this.hero = data.hero

    this.mute = false


    this.count_created_scenes = 0
  }
  create() {
    this.game_velocity = GAME_VELOCITY
    let rooms = new Rooms(this)

    this.player = new Player(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2 + 300,
      `player_${this.hero}_1`,
      {"playerScale": 0.7, hero: this.hero}
    )

    this.left_element = this.add.tileSprite(0, 0, 510, this.game.config.height, "left_element").setOrigin(0);
    this.right_element = this.add.tileSprite(this.game.config.width - 510, 0, 0, this.game.config.height, "right_element").setOrigin(0);

    // this.podskazka = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2 + 100, 'podskazka').setAlpha(0)

    this.border = new Borders(this)
    this.negative = new Negative(this)
    this.positive = new Positive(this)
    this.spots = new Spots(this)
    this.coins = new Coins(this)

    this.ui = new UI_elements(this, 0, 3)

    this.addOverlap()
    // this.createMusic()
    this.onMusic()

    this.createTouch()
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
        // this.children.bringToTop(target)        
      },
      onComplete: () => {
        target.setAlive(false);
        target.alpha = 1
        target.scale = 1
        // this.children.bringToTop(this.ui)        
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
  createMusic() { 
    // if (this.mute) this.scene.get("Start").main_theme.pause();
    // else this.scene.get("Start").main_theme.resume();
  }
  onMusic() {
    this.ui.sound.on("pointerdown", () => {
      // console.log("EVENTS ", this.events.eventNames())
      // console.log("UPDATE ",this.events.listenerCount("update"))
      // console.log("LEAVE ",this.events.listenerCount("leave"))
      // console.log("start", this.events.listeners("start"))
      // console.log("destroy", this.events.listeners("destroy"))
      // console.log("shutdown", this.events.listeners("shutdown"))
      // console.log("update", this.events.listeners("update"))
      // console.log("preupdate", this.events.listeners("preupdate"))
      // console.log("transitionstart", this.events.listeners("transitionstart"))
      // console.log("transitionout", this.events.listeners("transitionout"))
      // console.log("pause", this.events.listeners("pause"))
      // console.log("sleep", this.events.listeners( "sleep"))
      // console.log("pause", this.events.listeners("pause"))
      // console.log("postupdate", this.events.listeners("postupdate"))
      // console.log("leave", this.events.listeners("leave"))
      // console.log("SCENES ", this.scene.manager.scenes)
      if (this.mute == false) {
        this.ui.sound.setTexture("musicOff");
        this.mute = true;
        this.createMusic();
      } else {
        this.ui.sound.setTexture("musicOn");
        this.mute = false;
        this.createMusic();
      }
    });
  }
  createTouch() {
    let left = this.add.container(0, 0).setInteractive(
      new Phaser.Geom.Rectangle(0, 100, WIDTH / 2, HEIGHT),
      Phaser.Geom.Rectangle.Contains
    )
    left.on("pointerdown",()=>{
        console.log("LEFT")
        this.player.leftMove()
    })

    let right = this.add.container(0, 0).setInteractive(
      new Phaser.Geom.Rectangle(WIDTH / 2, 100, WIDTH, HEIGHT),
      Phaser.Geom.Rectangle.Contains
    )
    right.on("pointerdown",()=>{
        console.log("RIGHT")
        this.player.rightMove()
    })
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
