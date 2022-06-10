import LoadingBar from "../classes/LoadingBar";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
    console.log("PreloadScene")
  }
  preload() {
    this.createBackground();
    var loadingBar = new LoadingBar(this);
    this.preloadAssets();
  }
  create() {
    // this.scene.start("Start");
    this.scene.start("Game");
  }
  createBackground() {
    var bg = this.add.graphics();
    bg.fillStyle(0x000000, 1);
    bg.fillRect(0, 0, 500, 800);
  }
  preloadAssets() {
    this.load.setBaseURL(document.location.href);
    this.load.image("bg", "src/assets/sprites/3.png");
    this.load.image("player", "src/assets/sprites/player2.png");
    this.load.image("bg_1", "src/assets/sprites/1_1.png");
    this.load.image("bg_2", "src/assets/sprites/1_2.png");
  }
}
