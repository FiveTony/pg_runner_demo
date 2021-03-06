import Borders from "../classes/Borders";
import Coins from "../classes/Coins";
import Negative from "../classes/Negative";
import Player from "../classes/Player";
import Positive from "../classes/Positive";
import Rooms from "../classes/Rooms";
import Spots from "../classes/Spots";
import UI_elements from "../classes/UI_elements";
import StartScene from "./StartScene";

const WIDTH = 1920
const HEIGHT = 1080

const GAME_VELOCITY_START = 6

const SCORE_SPOT = 3
const SCORE_COIN = 1
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

    this.prompt1_flag = true
    this.prompt3_flag = true
    this.prompt5_flag = true

    this.count_created_scenes = 0

    this.play_num = 1
  }
  create() {
    this.game_velocity = 0
    
    let rooms = new Rooms(this)

    this.player = new Player(
      this,
      WIDTH / 2,
      HEIGHT / 2 + 300,
      `player_${this.hero}_1`,
      {"playerScale": 0.7, hero: this.hero}
    )

      this.start_button = this.add.sprite(WIDTH / 2, HEIGHT / 2 + 100, "start_hover")
        .setInteractive()
        .once("pointerdown", ()=> {
          this.player.play("player_animation");
          this.game_velocity = GAME_VELOCITY_START
          this.events.emit("start_game")
          this.events.removeListener("start_game")
          this.start_button.destroy()
          this.play_num++
        })
        .on("pointermove", ()=>{
          this.start_button.scale = 1.3
          this.start_button.angle = 5
          this.start_button.setTexture("start")
        })
        .on("pointerout", ()=>{
          this.start_button.scale = 1
          this.start_button.angle = 0
          this.start_button.setTexture("start_hover")
        })

        this.tweens.add({
          targets: this.start_button,
          alpha: {
            from: 1,
            to: 0.8
          },
          angle: {
            from: -7,
            to: 7
          },
          repeat: -1,
          ease: "Linear",
          yoyo: true,
          duration: 800,
          onComplete: function () {
            this.start_button.alpha = 1;
          },
        });

    this.left_element = this.add.tileSprite(0, 0, 510, HEIGHT, "left_element").setOrigin(0);
    this.right_element = this.add.tileSprite(WIDTH - 510, 0, 0, HEIGHT, "right_element").setOrigin(0);

    this.border = new Borders(this)
    this.negative = new Negative(this)
    this.positive = new Positive(this)
    this.spots = new Spots(this)
    this.coins = new Coins(this)

    this.ui = new UI_elements(this, 0, 3)

    this.createSounds()
    this.addOverlap()
    this.onMusic()
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
  onNegativeOverlap(source, target) { // source - ??????????
    target.body.enable = false
    this.cameras.main.shake(500, 0.005)
    if (!this.mute) {
      this.hero === "musya" ? this.get_negative_musya.play() : this.get_negative.play()
    }

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
          this.ui.heart_1.setFrame('not_hp')
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
          this.ui.heart_2.setFrame('not_hp')
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
          this.ui.heart_3.setFrame('not_hp')
          // this.ui.heart_3.alpha = 1
          // this.ui.heart_3.scale = 1

          this.game.scene.add('Start', StartScene, true);

          // this.scene.start("Start")
          this.scene.remove("Game")
        },
      });
      this.hearts--

      // this.scene.wake("Start")
      // this.scene.remove("Game")
      // this.scene.sleep("Game")

      // this.scene.switch("Start");
      // this.events.removeAllListeners("update")
      // this.events.removeAllListeners("leave")
      // console.log(this.play_num)
      // this.scene.start("Game", {hero:"dima", play_num: this.play_num})
      // this.scene.start("Start")
      // this.scene.remove("Game")

      // console.log( this.scene.manager.processQueue())
      
      
      // this.events.removeAllListeners()
      // console.log(this.scene.manager.getScenes(false))
      // this.ui.heart_3.setTexture('not_hp')




      // this.scene.stop()
      // this.scene.start("Game")
    }  
  }
  onPositiveOverlap(source, target) {
    if (!this.mute) this.get_positive.play()
    target.body.enable = false
    if (this.prompt5_flag) {
      this.createPrompt(5, target.x, target.y)
      this.prompt5_flag = false
    }
    this.tweens.add({
      targets: target,
      scale: {
        from: 0.6,
        to: 1.2
      },
      alpha: {
        from: 1,
        to: 0.8
      },
      // y: "-=300",
      ease: "Power2",
      duration: 900,
      onComplete: () => {
        target.setAlive(false);
        target.alpha = 1
        target.scale = 0.6
      },
    });
    // target.setAlive(false);
    this.score += SCORE_POSITIVE
    this.ui.score_text.setText(`${this.score}`);
  }
  onCoinsOverlap(source, target) {
    if (!this.mute) this.get_positive.play()
    target.body.enable = false
    if (this.prompt1_flag) {
      this.createPrompt(1, target.x, target.y)
      this.prompt1_flag = false
    }
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
    if (!this.mute) this.get_positive.play()
    target.body.enable = false
    if (this.prompt3_flag) {
      this.createPrompt(3, target.x, target.y)
      this.prompt3_flag = false
    }
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
  muteMusic() { 
    if (this.mute) this.scene.get("Preload").main_theme.pause();
    else this.scene.get("Preload").main_theme.resume();
  }
  createSounds() {
    this.get_positive = this.sound.add("get_positive", {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      delay: 0,
    });
    this.get_negative = this.sound.add("get_negative", {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      delay: 0,
    });
    this.get_negative_musya = this.sound.add("get_negative_musya", {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      delay: 0,
    });
    this.win = this.sound.add("win", {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      delay: 0,
    });
    this.swipe_sound = this.sound.add("swipe_sound", {
      mute: false,
      volume: 0.8,
      rate: 1,
      detune: 0,
      seek: 0,
      delay: 0,
    });
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
      // console.log(this.children.getAll())
      if (this.mute == false) {
        this.ui.sound.setFrame("musicOff");
        this.mute = true;
        this.muteMusic();
      } else {
        this.ui.sound.setFrame("musicOn");
        this.mute = false;
        this.muteMusic();
      }
    });
  }
  createPrompt(num, x, y) {
    let prompt = this.add.sprite(x, y, "prompts_spritesheet", `prompt${num}`)
    this.tweens.add({
      targets: prompt,
      alpha: {
        from: 1,
        to: 0
      },
      ease: "Power2",
      duration: 1800,
      onComplete: () => {
        prompt.destroy()
      },
    });
  }
}
