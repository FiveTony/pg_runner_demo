export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
    console.log("BootScene")
  }
  preload() {
    // this.load.setBaseURL(document.location.href);
    this.load.setBaseURL(document.location.origin + document.location.pathname);
    this.load.image("circle", "src/assets/sprites/2version/PreloadScene/circle.png");
    this.load.image("pg_label", "src/assets/sprites/2version/PreloadScene/pg_label.png");
  }
  create() {
    this.scene.start("Preload");
  }
}
