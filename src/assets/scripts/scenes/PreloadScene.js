const WIDTH = 1920
const HEIGHT = 1080

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
    console.log("PreloadScene")
  }
  preload() {
    this.createElements()
    this.preloadAssets();
  }
  create() {
    this.scene.start("Start");
    // this.scene.start("Game", {hero:"musya"});
  }
  preloadAssets() {
    // this.load.setBaseURL(document.location.href);
    // this.load.setBaseURL(document.location.origin + document.location.pathname);

    this.load.audio("main_theme", "src/assets/sounds/main_theme.mp3");
    this.load.audio("get_positive", "src/assets/sounds/get_positive.mp3");
    this.load.audio("get_negative", "src/assets/sounds/get_negative.mp3");
    this.load.audio("get_negative_musya", "src/assets/sounds/get_negative_musya.mp3");
    this.load.audio("win", "src/assets/sounds/win.mp3");

    this.load.image("prompt1", "src/assets/sprites/prompt1.png");
    this.load.image("prompt3", "src/assets/sprites/prompt3.png");
    this.load.image("prompt5", "src/assets/sprites/prompt5.png");



    this.load.image("musicOn", "src/assets/sprites/2version/musicOn.png");
    this.load.image("musicOff", "src/assets/sprites/2version/musicOff.png");



    this.load.image("border", "src/assets/sprites/2version/border.png");
    this.load.image("border2", "src/assets/sprites/2version/border2.png");
    this.load.image("room1", "src/assets/sprites/2version/room1.jpg");
    this.load.image("room2", "src/assets/sprites/2version/room2.jpg");
    this.load.image("room3", "src/assets/sprites/2version/room3.jpg");
    this.load.image("room4", "src/assets/sprites/2version/room4.jpg");
    this.load.image("room5", "src/assets/sprites/2version/room5.jpg");
    this.load.image("left_element", "src/assets/sprites/2version/left_element.jpg");
    this.load.image("right_element", "src/assets/sprites/2version/right_element.jpg");

    this.load.image("room1_1", "src/assets/sprites/2version/negative/1_1_2.png");
    this.load.image("room1_2", "src/assets/sprites/2version/negative/1_2_2.png");
    this.load.image("room1_3", "src/assets/sprites/2version/negative/1_3_2.png");

    this.load.image("room2_1", "src/assets/sprites/2version/negative/2_1_2.png");
    this.load.image("room2_2", "src/assets/sprites/2version/negative/2_2_2.png");
    this.load.image("room2_3", "src/assets/sprites/2version/negative/2_3_2.png");

    this.load.image("room3_1", "src/assets/sprites/2version/negative/3_1_2.png");
    this.load.image("room3_2", "src/assets/sprites/2version/negative/3_2_2.png");
    this.load.image("room3_3", "src/assets/sprites/2version/negative/3_3_2.png");

    this.load.image("room4_1", "src/assets/sprites/2version/negative/4_1_2.png");
    this.load.image("room4_2", "src/assets/sprites/2version/negative/4_2_2.png");
    this.load.image("room4_3", "src/assets/sprites/2version/negative/4_3_2.png");

    this.load.image("room5_1", "src/assets/sprites/2version/negative/5_1_2.png");
    this.load.image("room5_2", "src/assets/sprites/2version/negative/5_2_2.png");
    this.load.image("room5_3", "src/assets/sprites/2version/negative/5_3_2.png");

    this.load.image("spot_1", "src/assets/sprites/2version/positive/spot1_2.png");
    this.load.image("spot_2", "src/assets/sprites/2version/positive/spot2_2.png");

    this.load.image("coin", "src/assets/sprites/2version/positive/coin_2.png");

    this.load.image("positive1", "src/assets/sprites/2version/positive2/positive1.png");
    this.load.image("positive2", "src/assets/sprites/2version/positive2/positive2.png");
    this.load.image("positive3", "src/assets/sprites/2version/positive2/positive3.png");
    this.load.image("positive4", "src/assets/sprites/2version/positive2/positive4.png");
    this.load.image("positive5", "src/assets/sprites/2version/positive2/positive5.png");
    this.load.image("positive6", "src/assets/sprites/2version/positive2/positive6.png");
    this.load.image("positive7", "src/assets/sprites/2version/positive2/positive7.png");
    this.load.image("positive8", "src/assets/sprites/2version/positive2/positive8.png");
    this.load.image("positive9", "src/assets/sprites/2version/positive2/positive9.png");
    this.load.image("positive10", "src/assets/sprites/2version/positive2/positive10.png");
    this.load.image("positive11", "src/assets/sprites/2version/positive2/positive11.png");
    // this.load.image("positive1", "src/assets/sprites/2version/positive/positive1.png");
    // this.load.image("positive2", "src/assets/sprites/2version/positive/positive2.png");
    // this.load.image("positive3", "src/assets/sprites/2version/positive/positive3.png");
    // this.load.image("positive4", "src/assets/sprites/2version/positive/positive4.png");
    // this.load.image("positive5", "src/assets/sprites/2version/positive/positive5.png");
    // this.load.image("positive6", "src/assets/sprites/2version/positive/positive6.png");
    // this.load.image("positive7", "src/assets/sprites/2version/positive/positive7.png");
    // this.load.image("positive8", "src/assets/sprites/2version/positive/positive8.png");
    // this.load.image("positive9", "src/assets/sprites/2version/positive/positive9.png");
    // this.load.image("positive10", "src/assets/sprites/2version/positive/positive10.png");
    // this.load.image("positive11", "src/assets/sprites/2version/positive/positive11.png");

    this.load.image("hp", "src/assets/sprites/2version/ui/hp.png");
    this.load.image("not_hp", "src/assets/sprites/2version/ui/not_hp.png");
    this.load.image("score_coin", "src/assets/sprites/2version/ui/score_coin.png");
    this.load.image("score_rectangle", "src/assets/sprites/2version/ui/score_rectangle.png");

    this.preloadStartScene()
    this.preloadPlayers()

  }
  preloadPlayers() {
    this.load.image("player_rita_1", "src/assets/sprites/2version/player/player_rita_1.png");
    this.load.atlas(
      "player_rita", "src/assets/sprites/2version/player/player_rita.png", 
      "src/assets/sprites/2version/player/player_rita.json");

    this.load.image("player_musya_1", "src/assets/sprites/2version/player/player_musya_1.png");
    this.load.atlas(
      "player_musya", "src/assets/sprites/2version/player/player_musya.png", 
      "src/assets/sprites/2version/player/player_musya.json");

    this.load.image("player_dima_1", "src/assets/sprites/2version/player/player_dima_1.png");
    this.load.atlas(
      "player_dima", "src/assets/sprites/2version/player/player_dima.png", 
      "src/assets/sprites/2version/player/player_dima.json");
  }
  preloadStartScene() {
    this.load.atlas(
      "charactersChoose", "src/assets/sprites/2version/StartScene/charactersChoose.png", 
      "src/assets/sprites/2version/StartScene/charactersChoose.json");
  }
  createElements() {
    this.add.graphics()
      .fillGradientStyle(0x062A67,0x062A67,0x1A499B, 0x1A499B, 1)
      .fillRect(0, 0, WIDTH, HEIGHT);

    this.add.text(WIDTH / 2, 235, "Подумайте о хорошем,\nпока ждёте 😊", {
        font: '76px Monserrat-Bold',
        fill: '#FFFFFF',
        align: 'center',  // 'left'|'center'|'right'|'justify'
        lineSpacing: 20,
      }).setOrigin(0.5)
    this.add.sprite(WIDTH / 2, 725 + 120, "pg_label")
    this.add.sprite(WIDTH / 2, HEIGHT / 2, "pattern")
    this.circle = this.add.sprite(WIDTH / 2, HEIGHT / 2, "circle")
    this.load.on('progress', ()=> {
      this.circle.angle += 1
    }, this)
    this.load.on('complete', ()=> {
      // this.circle.destroy()
      // this.load.removeAllListeners()
    }, this)
  }
}