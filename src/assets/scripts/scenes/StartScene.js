const HEARTS = 3

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("Start");
  }
  init() {
    this.width = this.game.config.width
    this.height = this.game.config.height
  }
  create(data) {
    this.createBackground();
    this.createAnimation();
    this.setEvents();
  }
  createBackground() {
    this.bg = this.add
      .graphics()
      .fillStyle(0x000000, 1)
      .fillRect(0, 0, 500, 800);

    this.stars = this.add
      .tileSprite(
        0,
        0,
        this.width,
        this.height,
        "stars"
      )
      .setOrigin(0);
  }
  setEvents() {
    this.input.on("pointerdown", () => {
      this.scene.start("Game", {
        score: 0,
        hearts: HEARTS,
        status: "first",
      });
    });
    this.input.keyboard.on("keydown", () => {
      this.scene.start("Game", {
        score: 0,
        hearts: HEARTS,
        status: "first",
      });
    });
  }
  restartGame(data) {
    this.scene.stop();
    this.scene.start("PopupComplete", { status: "lose", data: data });
  }
  createAnimation() {
    let text = this.add
      .text(this.width / 2, this.height / 2, "НАЧАТЬ", {
        font: "40px BalsamiqSans",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5)
      .setAlpha(0).setTint(0xF1A901, 0xF1A901, 0xFFE305, 0xFFE305);
    this.tweens.add({
      targets: text,
      alpha: 1,
      scale: { from: 0.2, to: 1 },
      ease: "Quart",
      rotation: 2 * Math.PI,
      duration: 3000,
    });
    let container1 = this.add.container(0, 0, [
      this.add.sprite(110, 380, "meteor01"),
      this.add.sprite(120, 120, "positive_01"),
      this.add.sprite(100, 570, "positive_02"),
      this.add.sprite(400, 700, "positive_03"),
    ]);
    let container2 = this.add.container(0, 0, [
      this.add.sprite(410, 110, "meteor01").setAlpha(0),
      this.add.sprite(200, 670, "meteor02").setAlpha(0),
      this.add.sprite(270, 230, "meteor03").setAlpha(0),
      this.add.sprite(400, 600, "positive_04").setAlpha(0),
      this.add.sprite(400, 300, "positive_05").setAlpha(0),
      this.add.sprite(80, 270, "positive_01").setAlpha(0),
    ]);
    this.tweens.add({
      targets: container1.getAll(),
      duration: 10000,
      scale: { from: 0.7, to: 0.9 },
      rotation: 2 * Math.PI,
      repeat: -1,
      loop: -1,
      yoyo: true,
    });
    this.tweens.add({
      targets: container2.getAll(),
      duration: 10000,
      scale: { from: 0.7, to: 0.9 },
      rotation: -2 * Math.PI,
      repeat: -1,
      loop: -1,
      yoyo: true,
    });
    this.tweens.add({
      targets: container1.getAll(),
      alpha: 0,
      duration: 5000,
      repeat: -1,
      loop: -1,
      yoyo: true,
    });
    this.tweens.add({
      targets: container2.getAll(),
      alpha: 1,
      duration: 5000,
      repeat: -1,
      loop: -1,
      yoyo: true,
    });
  }
}
