const BG_WIDTH = 1165
const WIDTH = 1920

const LEFT = 600
const CENTER = 1000
const RIGHT = 1400

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, frame, config) {
    super(scene, x, y, frame);
    this.config = config;
    this.init();
  }
  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;

    this.direction = 0

    this.setScale(this.config.playerScale);
    this.scene.events.on("update", this.update, this);

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
}
