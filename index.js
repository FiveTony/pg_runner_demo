import Phaser from "phaser";
// import Phaser from "./phaser-custom";

import BootScene from "./src/assets/scripts/scenes/BootScene";
import PreloadScene from "./src/assets/scripts/scenes/PreloadScene";
// import StartScene from "./src/assets/scripts/scenes/StartScene";
// import GameScene from "./src/assets/scripts/scenes/GameScene";

var scenes = [
  BootScene,
  PreloadScene,
  // StartScene,
  // GameScene,
];

var config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scene: scenes,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  // multiTexture: true,
  enableDebug: false,
  
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
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
  parent: "game", // чтобы игра была внутри div
};

var game = new Phaser.Game(config);


// var WebFont = require("webfontloader");
// WebFont.load({
//   custom: {
//     families: ["Monserrat-Bold, Monserrat-Medium"],
//     urls: ["src/assets/styles/fonts.css"],
//   },
//   active: function () {
//     console.log("FONTS")
//     var game = new Phaser.Game(config);
//   },
// });