import GameScene from "./GameScene";
import StartScene from "./StartScene";

const WIDTH = 1920
const HEIGHT = 1080

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
    console.log("PreloadScene")
  }
  preload() {
    // this.main_theme = this.sound.add("main_theme", {
    //   mute: false,
    //   volume: 0.2,
    //   rate: 1,
    //   detune: 0,
    //   seek: 0,
    //   loop: true,
    //   delay: 0,
    // });
    // this.main_theme.play();   

    // this.createElements()
    this.preloadAssets();
  }
  create() {
  // this.game.scene.add('Start', StartScene, true);

      this.game.scene.add('Game', GameScene, true, {hero: "musya", play_num: 1});

}
  preloadAssets() {
    // this.load.setBaseURL(document.location.href);
    // this.load.setBaseURL(document.location.origin + document.location.pathname);

    this.load.audio("get_positive", "src/assets/sounds/get_positive.mp3");
    this.load.audio("get_negative", "src/assets/sounds/get_negative.mp3");
    this.load.audio("get_negative_musya", "src/assets/sounds/get_negative_musya.mp3");
    this.load.audio("win", "src/assets/sounds/win.mp3");

    this.load.image("border", "src/assets/sprites/mob/border.png");

    this.load.atlas(
      "ui_spritesheet", "src/assets/sprites/mob/ui/ui_spritesheet.png", 
      "src/assets/sprites/mob/ui/ui_spritesheet.json");

    this.load.atlas(
      "prompts_spritesheet", "src/assets/sprites/mob/prompts_spritesheet.png", 
      "src/assets/sprites/mob/prompts_spritesheet.json");
    
      
    this.load.image("left_element", "src/assets/sprites/mob/left_element.png");
    this.load.image("right_element", "src/assets/sprites/mob/right_element.png");


    this.preloadStartScene()
    this.preloadPlayers()
    this.preloadRooms()
    this.preloadNegativePositive()

  }
  preloadPlayers() {
    this.load.image("player_rita_1", "src/assets/sprites/mob/player/player_rita_1.png");
    this.load.atlas(
      "player_rita", "src/assets/sprites/mob/player/player_rita.png", 
      "src/assets/sprites/mob/player/player_rita.json");

    this.load.image("player_musya_1", "src/assets/sprites/mob/player/player_musya_1.png");
    this.load.atlas(
      "player_musya", "src/assets/sprites/mob/player/player_musya.png", 
      "src/assets/sprites/mob/player/player_musya.json");

    this.load.image("player_dima_1", "src/assets/sprites/mob/player/player_dima_1.png");
    this.load.atlas(
      "player_dima", "src/assets/sprites/mob/player/player_dima.png", 
      "src/assets/sprites/mob/player/player_dima.json");
  }
  preloadStartScene() {
    this.load.atlas(
      "charactersChoose", "src/assets/sprites/mob/StartScene/charactersChoose.png", 
      "src/assets/sprites/mob/StartScene/charactersChoose.json");

    this.load.image("rita_button_hover", "src/assets/sprites/mob/StartScene/rita_button_hover.png");
    this.load.image("dima_button_hover", "src/assets/sprites/mob/StartScene/dima_button_hover.png");
    this.load.image("musya_button_hover", "src/assets/sprites/mob/StartScene/musya_button_hover.png");
    
    this.load.image("rita_button", "src/assets/sprites/mob/StartScene/rita_button.png");
    this.load.image("dima_button", "src/assets/sprites/mob/StartScene/dima_button.png");
    this.load.image("musya_button", "src/assets/sprites/mob/StartScene/musya_button.png");

  }
  preloadRooms() {
    this.load.image("room1", "src/assets/sprites/mob/rooms/room1.png");
    this.load.image("room2", "src/assets/sprites/mob/rooms/room2.png");
    this.load.image("room3", "src/assets/sprites/mob/rooms/room3.png");
    this.load.image("room4", "src/assets/sprites/mob/rooms/room4.png");
    this.load.image("room5", "src/assets/sprites/mob/rooms/room5.png");

    // this.load.atlas(
    //   "rooms", "src/assets/sprites/mob/rooms/rooms_spritesheet.png", 
    //   "src/assets/sprites/mob/rooms/rooms_spritesheet.json");
  }
  preloadNegativePositive() {
    this.load.atlas(
      "negative_spritesheet", "src/assets/sprites/mob/negative/negative_spritesheet.png", 
      "src/assets/sprites/mob/negative/negative_spritesheet.json");

    this.load.atlas(
      "positive_spritesheet", "src/assets/sprites/mob/positive/positive_spritesheet.png", 
      "src/assets/sprites/mob/positive/positive_spritesheet.json");
  }
  createElements() {
    let preload_graphics = this.add.graphics()
      .fillGradientStyle(0x062A67,0x062A67,0x1A499B, 0x1A499B, 1)
      .fillRect(0, 0, WIDTH, HEIGHT);

    let preload_text = this.add.text(WIDTH / 2, 235, "Подумайте о хорошем,\nпока ждёте 😊", {
        font: '76px Monserrat-Bold',
        fill: '#FFFFFF',
        align: 'center',  // 'left'|'center'|'right'|'justify'
        lineSpacing: 20,
      }).setOrigin(0.5)
    let preload_label = this.add.sprite(WIDTH / 2, 725 + 120, "pg_label")
    let preload_pattern = this.add.sprite(WIDTH / 2, HEIGHT / 2, "pattern")
    let circle = this.add.sprite(WIDTH / 2, HEIGHT / 2, "circle")
    this.load.on('progress', ()=> {
      circle.angle += 1
    }, this)
    this.load.on('complete', ()=> {
      preload_text.destroy()
      preload_graphics.destroy()
      preload_label.destroy()
      preload_pattern.destroy()
      circle.destroy()
      this.load.removeAllListeners()
    }, this)
  }
}
