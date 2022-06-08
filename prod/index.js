// import Phaser from "phaser";
import Phaser from "../phaser-custom";

import BootScene from "../src/assets/scripts/scenes/BootScene";
import PreloadScene from "../src/assets/scripts/scenes/PreloadScene";
import StartScene from "../src/assets/scripts/scenes/StartScene";
import GameScene from "../src/assets/scripts/scenes/GameScene";
import PauseScene from "../src/assets/scripts/scenes/PauseScene";
import PopupCompleteScene from "../src/assets/scripts/scenes/PopupCompleteScene";
import ShakePositionPlugin from 'phaser3-rex-plugins/plugins/shakeposition-plugin.js';


var scenes = [
  BootScene,
  PreloadScene,
  StartScene,
  GameScene,
  PauseScene,
  PopupCompleteScene
];

var config = {
  type: Phaser.AUTO,
  width: 500,
  height: 800,
  scene: scenes,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: true,
    },
  },
  render: {
    antialias: true,
    antialiasGL: true,
    desynchronized: false,
    pixelArt: false,
    roundPixels: false,
    // transparent: false,
    clearBeforeRender: true,
    preserveDrawingBuffer: true,
    // premultipliedAlpha: true,
    // failIfMajorPerformanceCaveat: true,
    powerPreference: "high-performance", // 'high-performance', 'low-power' or 'default'
    batchSize: 4096,
    // maxLights: 10,
    maxTextures: -1,
    mipmapFilter: "LINEAR_MIPMAP_LINEAR", // 'NEAREST', 'LINEAR', 'NEAREST_MIPMAP_NEAREST', 'LINEAR_MIPMAP_NEAREST', 'NEAREST_MIPMAP_LINEAR', 'LINEAR_MIPMAP_LINEAR'
    // pipeline: []
  },
  fps: {
    min: 32,
    target: 42,
    forceSetTimeOut: false,
    deltaHistory: 320,
    panicMax: 600,
    smoothStep: true,
  },
  plugins: {
    global: [{
      key: 'rexShakePosition',
      plugin: ShakePositionPlugin,
      start: true
    },
    ]
  }
};

var game = new Phaser.Game(config);

// var WebFont = require("webfontloader");
// WebFont.load({
//   custom: {
//     families: ["BalsamiqSans"],
//     urls: ["../src/assets/styles/fonts.css"],
//   },
//   active: function () {
//     var game = new Phaser.Game(config);
//   }
// })
