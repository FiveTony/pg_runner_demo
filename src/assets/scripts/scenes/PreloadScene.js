import LoadingBar from "../classes/LoadingBar";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }
  preload() {
    this.createBackground();
    var loadingBar = new LoadingBar(this);
    this.preloadAssets();
  }
  create() {
    this.scene.start("Start");
  }
  createBackground() {
    var bg = this.add.graphics();
    bg.fillStyle(0x000000, 1);
    bg.fillRect(0, 0, 500, 800);

    this.stars = this.add
      .tileSprite(
        0,
        0,
        this.game.config.width,
        this.game.config.height,
        "stars"
      )
      .setOrigin(0);
  }
  preloadAssets() {
    this.load.setBaseURL(document.location.href);
    this.load.image("rocket", "src/assets/sprites/player2.png");

    this.load.image("meteor01", "src/assets/sprites/meteor01.png");
    this.load.image("meteor02", "src/assets/sprites/meteor02.png");
    this.load.image("meteor03", "src/assets/sprites/meteor03.png");
    this.load.image("meteor04", "src/assets/sprites/meteor04.png");
    this.load.image("meteor05", "src/assets/sprites/meteor05.png");
    this.load.image("meteor06", "src/assets/sprites/meteor06.png");
    this.load.image("meteor07", "src/assets/sprites/meteor07.png");
    this.load.image("meteor08", "src/assets/sprites/meteor08.png");


    this.load.image("icecream", "src/assets/sprites/icecream2.png");
    this.load.image("positive_01", "src/assets/sprites/positive_01.png");
    this.load.image("positive_02", "src/assets/sprites/positive_02.png");
    this.load.image("positive_03", "src/assets/sprites/positive_03.png");
    this.load.image("positive_04", "src/assets/sprites/positive_04.png");
    this.load.image("positive_05", "src/assets/sprites/positive_05.png");


    this.load.image("ufo01", "src/assets/sprites/ufo01.png");
    this.load.image("ufo02", "src/assets/sprites/ufo02.png");
    this.load.image("ufo03", "src/assets/sprites/ufo03.png");

    this.load.svg("leftElement", "src/assets/sprites/left_element.svg");
    this.load.svg("rightElement", "src/assets/sprites/right_element.svg");
    this.load.svg("play", "src/assets/sprites/play.svg");
    this.load.svg("pause", "src/assets/sprites/pause.svg");
    this.load.svg("soundOn", "src/assets/sprites/sound_on.svg");
    this.load.svg("soundOff", "src/assets/sprites/sound_off.svg");
    this.load.svg("btn1Pause", "src/assets/sprites/but_pause_1.svg");
    this.load.svg("btn2Pause", "src/assets/sprites/but_pause_2.svg");
    this.load.svg("btnNext", "src/assets/sprites/button_next.svg");
    this.load.svg("scoreCoin", "src/assets/sprites/score_coin.svg");
    this.load.svg("scoreRect", "src/assets/sprites/score_rectangle.svg");
    this.load.svg("hearts", "src/assets/sprites/hearts.svg");
    this.load.svg("hearts0", "src/assets/sprites/hearts_0.svg");
    this.load.svg("heartsRect", "src/assets/sprites/hearts_rectangle.svg");
    this.load.svg("levelUpPlanet1", "src/assets/sprites/level_up_planet1.svg");
    this.load.svg("levelUpPlanet2", "src/assets/sprites/level_up_planet2.svg");
    this.load.svg(
      "planetNextLevel1",
      "src/assets/sprites/planet_next_level_1.svg"
    );
    this.load.svg(
      "planetNextLevel2",
      "src/assets/sprites/planet_next_level_2.svg"
    );
    this.load.svg("btnLoseNewGame", "src/assets/sprites/but_lose_new_game.svg");
    this.load.svg("btnLoseExit", "src/assets/sprites/but_lose_exit.svg");
    this.load.svg("btn1PauseHover", "src/assets/sprites/but_pause_1_hover.svg");
    this.load.svg("btn2PauseHover", "src/assets/sprites/but_pause_2_hover.svg");
    this.load.svg("level1", "src/assets/sprites/level_1.svg");
    this.load.svg("level2", "src/assets/sprites/level_2.svg");
    this.load.svg("level3", "src/assets/sprites/level_3.svg");
    this.load.svg("winPlanet", "src/assets/sprites/win_planet.svg");
    this.load.svg("winPrise", "src/assets/sprites/win_prise.svg");
    this.load.svg("winClose", "src/assets/sprites/win_close.svg");
    this.load.svg("cup", "src/assets/sprites/cup.svg");
    this.load.svg("cupBigFinal", "src/assets/sprites/cupBigFinal.svg");
  }
}
