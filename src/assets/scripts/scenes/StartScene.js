const WIDTH = 1920
const HEIGHT = 1080

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("Start");
    console.log("StartScene")
  }
  create() {
    this.createBackground();
    this.createCharacters()
    // this.createMusic()
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
  createBackground() {
    this.add.graphics(0, 0, WIDTH, HEIGHT)
      .fillStyle(0x003DA6, 1)
      .fillRect(0, 0, WIDTH, HEIGHT);
    this.add.circle(220, HEIGHT / 2, 720, 0x00348E, 0.84 )

    this.add.text(WIDTH / 2, 110, "Выберите своего персонажа", {
      font: '80px Monserrat-Bold',
      fill: '#FFFFFF',
      align: 'center',  // 'left'|'center'|'right'|'justify'
      lineSpacing: 20,

  }).setOrigin(0.5)
  }
  createCharacters() {
    this.add.sprite(375, 240, "charactersChoose" ,"rita_label")
    this.rita_capture = this.add.sprite(370, 450, "charactersChoose" ,"rita_capture")
    this.rita_text = this.add.sprite(370, 730, "charactersChoose" ,"rita_text")
    this.add.sprite(370, 910, "charactersChoose" ,"rita_button")
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("Game", {
          hero: "rita"
        });
      })
      .on(
        "pointermove",
        function (pointer, x, y, event) {
          this.rita_capture.scale = 1.2;
          this.rita_text.angle = 5
        }.bind(this)
      )
      .on(
        "pointerout",
        function (pointer, x, y, event) {
          this.rita_capture.scale = 1;
          this.rita_text.angle = 0

        }.bind(this)
      );

    this.add.sprite(1920 / 2, 240, "charactersChoose" ,"dima_label")
    this.dima_capture = this.add.sprite(1920 / 2, 450, "charactersChoose" ,"dima_capture")
    this.dima_text = this.add.sprite(1920 / 2, 730, "charactersChoose" ,"dima_text")
    this.add.sprite(1920 / 2, 910, "charactersChoose" ,"dima_button")
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("Game", {
          hero: "dima"
        });
      })
      .on(
        "pointermove",
        function (pointer, x, y, event) {
          this.dima_capture.scale = 1.2;
          this.dima_text.angle = 5
        }.bind(this)
      )
      .on(
        "pointerout",
        function (pointer, x, y, event) {
          this.dima_capture.scale = 1;
          this.dima_text.angle = 0

        }.bind(this)
      );

    this.add.sprite(1920 - 370, 240, "charactersChoose" ,"musya_label")
    this.musya_capture = this.add.sprite(1920 - 370, 450, "charactersChoose" ,"musya_capture")
    this.musya_text = this.add.sprite(1920 - 370, 730, "charactersChoose" ,"musya_text")
    this.add.sprite(1920 - 370, 910, "charactersChoose" ,"musya_button")
    .setInteractive()
    .on("pointerdown", () => {
      this.scene.start("Game", {
        hero: "musya"
      });
    })
    .on(
      "pointermove",
      function (pointer, x, y, event) {
        this.musya_capture.scale = 1.2;
        this.musya_text.angle = 5
      }.bind(this)
    )
    .on(
      "pointerout",
      function (pointer, x, y, event) {
        this.musya_capture.scale = 1;
        this.musya_text.angle = 0

      }.bind(this)
    );
  }
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

}