const BG_WIDTH = 1165
const WIDTH = 1920

const LEFT = 700
const CENTER = 975
const RIGHT = 1250

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, frame, config) {
    super(scene, x, y, frame);
    this.config = config
    this.init();
  }
  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;

    this.direction = 0

    this.hero = this.config.hero

    this.setScale(this.config.playerScale);
    this.scene.events.on("update", this.update, this);

    this.createControlKeyboard()

    this.setAnimation();
    
  }
  createControlKeyboard() {
    this.scene.input.keyboard.on('keyup-LEFT', function(event) {
      if (this.direction === 0) {
        this.x = LEFT
        this.direction = -1
      } else if (this.direction === 1) {
        this.x = CENTER
        this.direction = 0
      }
    },this);
    this.scene.input.keyboard.on('keyup-RIGHT', function(event) {
      if (this.direction === 0) {
        this.x = RIGHT
        this.direction = 1
      } else if (this.direction === -1) {
        this.x = CENTER
        this.direction = 0
      }
    },this);
  }
  setAnimation() {
    const frames = this.anims.generateFrameNames(`player_${this.hero}`, {
      prefix: `player_${this.hero}_`,
      start: 1,
      end: 2,
    });

    this.anims.create({
      key: "player_animation",
      frames: frames, // массив фреймов
      frameRate: 1.7, // кадров в сек
      repeat: -1,
    });

    this.play("player_animation");
    // this.player1.anims.pause();
  }
}
