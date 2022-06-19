const WIDTH = 1920
const HEIGHT = 1080

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("Start");
    console.log("StartScene")
  }
  create() {
    this.createBackground();
    // this.setEvents();
    console.log("PPPPPPPP")
    this.scene.start("Game", {hero: "cat"});

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
  setEvents() {
    // this.input.on("pointerdown", () => {
    //   this.scene.start("Game", {
    //     score: 0,
    //     hearts: HEARTS,
    //     status: "first",
    //   });
    // });
    // this.input.keyboard.on("keydown", () => {
    //   this.scene.start("Game", {
    //     score: 0,
    //     hearts: HEARTS,
    //     status: "first",
    //   });
    // });
  }

}
