const WIDTH = 500
const HEIGHT = 800
const SWIPE_POWER = 30

const LEFT = 72
const CENTER = - 72 - 356
const RIGHT = - 72 - 356 - 72 - 356 - 72


import GameScene from "./GameScene";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("Start");
    console.log("StartScene")
  }
  create() {
    this.cameras.main.setRoundPixels(true)
    this.direction = -1
    this.isClicking = false
    this.createBackground();
    this.createCharacters2()
  }
  createBackground() {
    this.add.graphics(0, 0, WIDTH, HEIGHT)
      .fillStyle(0x003DA6, 1)
      .fillRect(0, 0, WIDTH, HEIGHT);
    // this.add.circle(220, HEIGHT / 2, 720, 0x00348E, 0.84)

    this.add.text(WIDTH / 2, 86, "Выберите своего\nперсонажа", {
      font: 'bold 40px Montserrat',
      fill: '#FFFFFF',
      align: 'center',  // 'left'|'center'|'right'|'justify'
      lineSpacing: 10,

  }).setOrigin(0.5)

  }
  launchGame(hero) {
    this.game.scene.add('Game', GameScene, true, {
      hero: hero, 
      play_num: 1
    });
    this.scene.remove("Start")
  }
  // createCharacters() {
  //   this.add.sprite(375, 240, "charactersChoose" ,"rita_label")
  //   .setInteractive()
  //   .on(
  //     "pointermove",
  //     function (pointer, x, y, event) {
  //       this.rita_capture.scale = 1.2;
  //       this.rita_text.angle = 5
  //       this.rita_button.setTexture("rita_button_hover")
  //     }.bind(this)
  //   )
  //   .on(
  //     "pointerout",
  //     function (pointer, x, y, event) {
  //       this.rita_capture.scale = 1;
  //       this.rita_text.angle = 0
  //       this.rita_button.setTexture("rita_button")

  //     }.bind(this)
  //   );
  //   this.rita_capture = this.add.sprite(370, 450, "charactersChoose" ,"rita_capture")
  //   .setInteractive()
  //   .on(
  //     "pointermove",
  //     function (pointer, x, y, event) {
  //       this.rita_capture.scale = 1.2;
  //       this.rita_text.angle = 5
  //       this.rita_button.setTexture("rita_button_hover")
  //     }.bind(this)
  //   )
  //   .on(
  //     "pointerout",
  //     function (pointer, x, y, event) {
  //       this.rita_capture.scale = 1;
  //       this.rita_text.angle = 0
  //       this.rita_button.setTexture("rita_button")

  //     }.bind(this)
  //   );
  //   this.rita_text = this.add.sprite(370, 730, "charactersChoose" ,"rita_text")
  //   .setInteractive()
  //   .on(
  //     "pointermove",
  //     function (pointer, x, y, event) {
  //       this.rita_capture.scale = 1.2;
  //       this.rita_text.angle = 5
  //       this.rita_button.setTexture("rita_button_hover")
  //     }.bind(this)
  //   )
  //   .on(
  //     "pointerout",
  //     function (pointer, x, y, event) {
  //       this.rita_capture.scale = 1;
  //       this.rita_text.angle = 0
  //       this.rita_button.setTexture("rita_button")

  //     }.bind(this)
  //   );
  //   this.rita_button = this.add.sprite(370, 910, "rita_button")
  //     .setInteractive()
  //     .on("pointerdown", () => {
  //       this.game.scene.add('Game', GameScene, true, {
  //         hero: "rita", 
  //         play_num: 1
  //       });
  //       this.scene.remove("Start")
  //     })
  //     .on(
  //       "pointermove",
  //       function (pointer, x, y, event) {
  //         this.rita_capture.scale = 1.2;
  //         this.rita_text.angle = 5
  //         this.rita_button.setTexture("rita_button_hover")
  //       }.bind(this)
  //     )
  //     .on(
  //       "pointerout",
  //       function (pointer, x, y, event) {
  //         this.rita_capture.scale = 1;
  //         this.rita_text.angle = 0
  //         this.rita_button.setTexture("rita_button")

  //       }.bind(this)
  //     );

  //   this.add.sprite(1920 / 2, 240, "charactersChoose" ,"dima_label")
  //   this.dima_capture = this.add.sprite(1920 / 2, 450, "charactersChoose" ,"dima_capture")
  //   this.dima_text = this.add.sprite(1920 / 2, 730, "charactersChoose" ,"dima_text")
  //   this.dima_button = this.add.sprite(1920 / 2, 910,"dima_button")
  //     .setInteractive()
  //     .on("pointerdown", () => {
  //       this.game.scene.add('Game', GameScene, true, {
  //         hero: "dima", 
  //         play_num: 1
  //       });
  //       this.scene.remove("Start")
  //     })
  //     .on(
  //       "pointermove",
  //       function (pointer, x, y, event) {
  //         this.dima_capture.scale = 1.2;
  //         this.dima_text.angle = 5
  //         this.dima_button.setTexture("dima_button_hover")
  //       }.bind(this)
  //     )
  //     .on(
  //       "pointerout",
  //       function (pointer, x, y, event) {
  //         this.dima_capture.scale = 1;
  //         this.dima_text.angle = 0
  //         this.dima_button.setTexture("dima_button")
  //       }.bind(this)
  //     );

  //   this.add.sprite(1920 - 370, 240, "charactersChoose" ,"musya_label")
  //   this.musya_capture = this.add.sprite(1920 - 370, 450, "charactersChoose" ,"musya_capture")
  //   this.musya_text = this.add.sprite(1920 - 370, 730, "charactersChoose" ,"musya_text")
  //   this.musya_button = this.add.sprite(1920 - 370, 910, "musya_button")
  //   .setInteractive()
  //   .on("pointerdown", () => {
  //       this.game.scene.add('Game', GameScene, true, {
  //         hero: "musya", 
  //         play_num: 1
  //       });
  //       this.scene.remove("Start")
  //     })
  //   .on(
  //     "pointermove",
  //     function (pointer, x, y, event) {
  //       this.musya_capture.scale = 1.2;
  //       this.musya_text.angle = 5
  //       this.musya_button.setTexture("musya_button_hover")
  //     }.bind(this)
  //   )
  //   .on(
  //     "pointerout",
  //     function (pointer, x, y, event) {
  //       this.musya_capture.scale = 1;
  //       this.musya_text.angle = 0
  //       this.musya_button.setTexture("musya_button")
  //     }.bind(this)
  //   );
  // }
  createMusic() {
    this.main_theme = this.sound.add("main_theme", {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    });
    this.main_theme.play();
  }
  update() {
    if(!this.input.activePointer.isDown && this.isClicking == true) {
      if(Math.abs(this.input.activePointer.upX - this.input.activePointer.downX) >= SWIPE_POWER) {
          if(this.input.activePointer.upX < this.input.activePointer.downX) {
            this.rightMove()
          } else if(this.input.activePointer.upX > this.input.activePointer.downX) {
            this.leftMove()
          }
      }
      this.isClicking = false;
    } else if(this.input.activePointer.isDown && this.isClicking == false) {
      this.isClicking = true;
    }
  }
  leftMove() {
    console.log("LEFT")

    if (this.direction === 0) {
      this.big_container.x = LEFT
      this.direction = -1
      console.log(this.direction, this.big_container.x)
    } else if (this.direction === 1) {
      this.big_container.x = CENTER
      this.direction = 0
      console.log(this.direction, this.big_container.x)

    }
  }
  rightMove() {
    console.log("RIGHT")

    if (this.direction === 0) {
      this.big_container.x = RIGHT
      this.direction = 1
      console.log(this.direction, this.big_container.x)

    } else if (this.direction === -1) {
      this.big_container.x = CENTER
      this.direction = 0
      console.log(this.direction, this.big_container.x)

    }
  }
  createCharacters2() {
    this.big_container = this.add.container(72, 163)

    let container1 = this.add.container(0, 0)
    let graphics1 = this.add.graphics()
    .fillStyle(0x002F81, 1)
    .fillRoundedRect(0, 0, 356, 586, 10)
    let rita_label = this.add.sprite(356 / 2, 36, "rita_label").setOrigin(0.5)
    let rita_capture = this.add.sprite(356 / 2 - 10, 170, "rita_capture").setOrigin(0.5)
    let rita_text = this.add.sprite(356 / 2, 360, "rita_text").setOrigin(0.5)
    let rita_button = this.add.sprite(356 / 2, 470, "rita_button").setOrigin(0.5).setInteractive().on("pointerdown", () => this.launchGame("rita"))
    let rita_right_arrow = this.add.sprite(356 / 2 + 140, 170, "arrow").setOrigin(0.5).setInteractive().on("pointerdown", ()=>this.rightMove())
    let rita_slider = this.add.sprite(356 / 2, 570, "rita_slider").setOrigin(0.5)
    container1.add([graphics1, rita_label, rita_capture, rita_text, rita_button, rita_right_arrow, rita_slider])

    let container2 = this.add.container(356 + 72 + 72, 0)
    let graphics2 = this.add.graphics()
    .fillStyle(0x002F81, 1)
    .fillRoundedRect(0, 0, 356, 586, 10)
    let dima_label = this.add.sprite(356 / 2, 36, "dima_label").setOrigin(0.5)
    let dima_capture = this.add.sprite(356 / 2, 170, "dima_capture").setOrigin(0.5)
    let dima_text = this.add.sprite(356 / 2, 360, "dima_text").setOrigin(0.5)
    let dima_button = this.add.sprite(356 / 2, 470, "dima_button").setOrigin(0.5).setInteractive().on("pointerdown", () => this.launchGame("dima"))
    let dima_left_arrow = this.add.sprite(356 / 2 - 140, 170, "arrow").setOrigin(0.5).setAngle(180).setInteractive().on("pointerdown", ()=>this.leftMove())
    let dima_right_arrow = this.add.sprite(356 / 2 + 140, 170, "arrow").setOrigin(0.5).setInteractive().on("pointerdown", ()=>this.rightMove())
    let dima_slider = this.add.sprite(356 / 2, 570, "dima_slider").setOrigin(0.5)
    container2.add([graphics2, dima_label, dima_capture, dima_text, dima_button, dima_left_arrow, dima_right_arrow, dima_slider])

    let container3 = this.add.container(356 + 72 + 72 + 356 + 72 + 72, 0)
    let graphics3 = this.add.graphics()
    .fillStyle(0x002F81, 1)
    .fillRoundedRect(0, 0, 356, 586, 10)
    let musya_label = this.add.sprite(356 / 2, 36, "musya_label").setOrigin(0.5)
    let musya_capture = this.add.sprite(356 / 2, 170, "musya_capture").setOrigin(0.5)
    let musya_text = this.add.sprite(356 / 2, 360, "musya_text").setOrigin(0.5)
    let musya_button = this.add.sprite(356 / 2, 470, "musya_button").setOrigin(0.5).setInteractive().on("pointerdown", () => this.launchGame("musya"))

    let musya_left_arrow = this.add.sprite(356 / 2 - 140, 170, "arrow").setOrigin(0.5).setAngle(180).setInteractive().on("pointerdown", ()=>this.leftMove())
    let musya_slider = this.add.sprite(356 / 2, 570, "musya_slider").setOrigin(0.5)
    container3.add([graphics3, musya_label, musya_capture, musya_text, musya_button, musya_left_arrow, musya_slider])

    this.big_container.add([container1, container2, container3])

    console.log(this.direction, this.big_container.x)
  }

}
