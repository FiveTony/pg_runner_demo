export default class StartScene extends Phaser.Scene {
  constructor() {
    super("Start");
    console.log("StartScene")
  }
  init() {

  }
  create() {
    this.createBackground();
    this.setEvents();
  }
  createBackground() {
    this.bg = this.add
      .graphics()
      .fillStyle(0x000000, 1)
      .fillRect(0, 0, 500, 800);
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
  restartGame(data) {
    this.scene.stop();
    this.scene.start("PopupComplete", { status: "lose", data: data });
  }
}
