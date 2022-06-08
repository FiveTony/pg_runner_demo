export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot", {});
  }
  preload() {
    this.load.setBaseURL(document.location.href);
    console.log(document.location.href, document.location);
    this.load.svg("stars", "src/assets/sprites/stars.svg");
  }
  create() {
    this.createBackground();
    this.scene.start("Preload");
  }
  createBackground() {
    var bg = this.add.graphics()
      .fillStyle(0x000000, 1)
      .fillRect(0, 0, 500, 800);
  }
}
