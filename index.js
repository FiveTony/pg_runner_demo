import Phaser from "phaser";
import device from "current-device";

import BootSceneMob from "./src/assets/scripts/mob/scenes/BootScene";
import PreloadSceneMob from "./src/assets/scripts/mob/scenes/PreloadScene";

import BootSceneDesk from "./src/assets/scripts/desk/scenes/BootScene";
import PreloadSceneDesk from "./src/assets/scripts/desk/scenes/PreloadScene";




// window.mobile = device.mobile()
// window.desktop = device.desktop()

// window.mobile = true
// window.desktop = false

// window.mobile = false
// window.desktop = true

console.log("device.mobile(): ", device.mobile(), "device.desktop(): ", device.desktop())

const mobile = device.mobile()
// const mobile = true

if (mobile) {
  console.log("mobile")
  var scenes = [
    BootSceneMob,
    PreloadSceneMob,
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

} else {
  console.log("desktop")

  var scenes = [
    BootSceneDesk,
    PreloadSceneDesk,
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
}


var game = new Phaser.Game(config);

