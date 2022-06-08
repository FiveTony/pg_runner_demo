import Negative from "../classes/Negative";
import Player from "../classes/Player";
import Positive from "../classes/Positive";
import UI_elements from "../classes/UI_elements";

const LEFT_LIMIT = 35;
const RIGHT_LIMIT = 500 - 35;
const HEARTS_MIN = 0;

const IS_BACKGROUND_DYNAMIC = true
const BACKGROUND_VELOCITY = 0.15
const ACCELERATION_BACKGROUND = 0.001

const MAX_SCORE = 50
const SCORE_STEP = 1
const HEARTS = 3
const IS_LEVEL_ANIMATION = true

// const ACCELERATION_STEP = 1

const PLAYER_DATA = {
  "playerScale": 1
}
const NEGATIVE_DATA = {
  "frequencyNegative": [1000, 1100],
  "maxNegativeOnLevel": 200,
  "isHorizontal": true,
  "velocity": [250, 300],
  "isRotation": true,
  "negativeScale": 0.5,
  "accelerationFrequency": 0.2
}
const POSITIVE_DATA = {
  "frequencyPositive": [1100, 1200],
  "maxPositiveOnLevel": 200,
  "isHorizontal": false,
  "velocity": [250, 300],
  "isRotation": true,
  "accelerationFrequency": 0.2
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }
  init() {
    this.width = this.game.config.width
    this.height = this.game.config.height
  }
  create() {
    console.log(this.game.config)
    this.createBackground();

    this.backgroundVelocity = BACKGROUND_VELOCITY;
    this.tileVelocity = 0.1 + BACKGROUND_VELOCITY;

    this.score = 0;
    this.hearts = HEARTS;
    this.level = 1;
    this.countScorePositive = 0;

    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(
      this,
      this.width / 2,
      this.height - 100,
      "rocket",
      PLAYER_DATA
    )
      .setInteractive()
      .setVisible(false);


    // this.player.shake = this.plugins.get('rexShakePosition').add(this.player, {
    //   mode: 0,
    //   duration: 10000,
    //   magnitude: 1.5,
    //   magnitudeMode: 0
    // })


    // this.player.shake.shake();

    // this.isStart = false;
    // this.afterStart();
    this.start() // без анимации перед уровнем

    this.ui = new UI_elements(this, this.score, this.hearts);
    this.mute = false;
    this.createMusic(this.mute);
    this.onMusic();
    this.onPause();
  }
  update(timestep, dt) {
    this.stars.tilePositionY += -this.backgroundVelocity * dt;
    this.landscapeLeft.tilePositionY += -this.tileVelocity * dt;
    this.landscapeRight.tilePositionY += -this.tileVelocity * dt;
    this.player.move(this.cursors);
  }
  afterStart() {
    let planetNextLevel1 = this.add
      .sprite(this.width + 300, this.height + 300, "planetNextLevel1")
      .setOrigin(0);
    this.tweens.add({
      targets: planetNextLevel1,
      x: 370,
      y: 555,
      ease: "Cubic",
      duration: 2300,
      yoyo: true,
    });
    let planetNextLevel2 = this.add
      .sprite(-300, -300, "planetNextLevel2")
      .setOrigin(0);
    this.tweens.add({
      targets: planetNextLevel2,
      x: 0,
      y: 35,
      ease: "Cubic",
      duration: 2500,
      yoyo: true,
    });

    let levelSvg = this.add
      .sprite(this.width / 2, this.height / 2, `level${this.level}`)
      .setAlpha(0);
    this.tweens.add({
      targets: levelSvg,
      alpha: 1,
      ease: "Cubic",
      duration: 2600,
      yoyo: true,
      onComplete: () => {
        this.start();
      },
    });
  }
  start() {
    this.isStart = true;
    this.player.setVisible(true);
    this.object1 = new Negative(this, NEGATIVE_DATA);
    this.object2 = new Positive(this, POSITIVE_DATA);
    this.setDrag();
    this.addOverlap();
    this.createCompleteEvents();

    // this.player.shake.shake();
  }
  createBackground() {
    var bg = this.add.graphics()
      .fillStyle(0x000000, 1)
      .fillRect(0, 0, this.width, this.height);
    this.stars = this.add
      .tileSprite(
        0,
        0,
        this.width,
        this.height,
        "stars"
      )
      .setOrigin(0);

    this.landscapeLeft = this.add
      .tileSprite(0, 0, 0, this.height, "leftElement")
      .setOrigin(0);
    this.landscapeRight = this.add
      .tileSprite(this.width - 35, 0, 0, this.height, "rightElement")
      .setOrigin(0);
  }
  setDrag() {
    this.input.setDraggable(this.player);
    this.input.dragDistanceThreshold = 15;
    this.input.on("drag", function (pointer, gameObject, dragX) {
      if (dragX > RIGHT_LIMIT) gameObject.x = RIGHT_LIMIT;
      else if (dragX < LEFT_LIMIT) gameObject.x = LEFT_LIMIT;
      else gameObject.x = dragX;
    });
  }
  addOverlap() {
    this.physics.add.overlap(
      this.object1,
      this.player,
      this.onOverlap,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.object2,
      this.player,
      this.onOverlap,
      undefined,
      this
    );
  }
  onOverlap(source, target) {
    if ([source, target].find((item) => item.positive == true)) {
      this.score += SCORE_STEP;
      this.countScorePositive++;


      this.ui.rect2.setText(`${this.score}`);
      this.tweens.add({
        targets: this.ui.rect2,
        scale: {
          from: 1,
          to: 2
        },
        yoyo: true,
        repeat: 0,
        ease: "Power2",
        duration: 250
      });

      this.backgroundVelocity += ACCELERATION_BACKGROUND;
      this.tileVelocity += ACCELERATION_BACKGROUND;
    }
    if ([source, target].find((item) => item.positive == false)) {
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
      this.cameras.main.shake(500, 0.02)
      this.hearts--;


      this.ui.rect4.setText(`${this.hearts}`);
      // this.tweens.add({
      //   targets: this.ui.rect4,
      //   scale: {
      //     from: 1,
      //     to: 1.5
      //   },
      //   yoyo: true,
      //   repeat: 0,
      //   ease: "Power2",
      //   duration: 250
      // });
    }
    if (this.hearts == HEARTS_MIN) {
      this.ui.heartsImg.setTexture("hearts0");
      this.events.emit("defeat");
    }
    // if (
    //   this.score == 1000 &&
    //   [source, target].find((item) => item.positive == true)
    // ) {
    //   let ilon = this.add
    //     .sprite(this.width, this.height + 200, "ilon")
    //     .setScale(0.4)
    //     .setRotation(-0.3);
    //   this.tweens.add({
    //     targets: ilon,
    //     x: 430,
    //     y: 730,
    //     ease: "Cubic",
    //     duration: 1500,
    //     yoyo: true,
    //   });
    // }
    if (this.score >= MAX_SCORE) {
      this.onVictory();
      this.scene.stop();
    }
    // if (this.score >= MAX_SCORE) {
    //   this.onVictory();
    //   this.scene.stop();
    // }
    target.setAlive(false);
  }
  createCompleteEvents() {
    this.events.on("defeat", this.onDefeat, this);
  }
  onDefeat() {
    this.scene.stop();
    this.scene.start("PopupComplete", {
      score: this.score,
      hearts: this.hearts,
      status: "lose",
    });
  }
  onPause() {
    this.ui.play.on("pointerdown", () => {
      this.createMusic(false);
      this.scene.pause();
      this.scene.launch("Pause", { mode: "prod", scene: "GameScene" });
    });
  }
  createMusic(mute) { }
  onMusic() {
    this.ui.sound.on("pointerdown", () => {
      if (this.mute == false) {
        this.ui.sound.setTexture("soundOff");
        this.createMusic(this.mute);

        this.mute = true;
      } else {
        this.ui.sound.setTexture("soundOn");
        this.createMusic(this.mute);
        this.mute = false;
      }
    });
  }
  onVictory() {
    this.scene.stop();
    this.scene.start("PopupComplete", {
      score: this.score,
      hearts: this.hearts,
      status: "win",
    });
  }
}
