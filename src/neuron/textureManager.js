import GLOBALS from '../globals/globals.js';
import MapTile from '../world_map/mapTile.js';
import naturalResourceManager from '../resources/naturalResourceManager.js';

const textureManager = {
  textures : [],
  load : function(){
    var canvas, textures, size = 100;

    // tiles
    textures = [];

    for (var tileType in MapTile.prototype.tileTypes) {
      canvas = createCanvas(size, size);
      addBackground(canvas, MapTile.prototype.tileTypes[tileType].color);
      textures[tileType] = canvas;
    }

    textureManager.textures['mapTile'] = textures;

    // user resources
    textures = [];

    canvas = createCanvas(size, size);
    addTriangle(canvas, size, "#FF0");
    textures['construction'] = canvas;

    textureManager.textures['userResources'] = textures;

    // natural resource
    textures = [];

    for (var res  in naturalResourceManager.resources) {
      canvas = createCanvas(size, size);
      addDiamond(canvas, size, naturalResourceManager.resources[res].color);
      textures[res] = canvas;
    }

    textureManager.textures['naturalResources'] = textures;

    // buildings
    textures = [];

    canvas = createCanvas(size, size);
    addCross(canvas, size, "#FFF");
    textures['mine'] = canvas;

    textureManager.textures['buildings'] = textures;

    // general
    textures = [];

    canvas = createCanvas(size, size);
    addTriangleInverse(canvas, size, "#0FF");
    textures['city'] = canvas;

    textureManager.textures['general'] = textures;
  },
}

function createCanvas(width, height){
  var canvas    = document.createElement('canvas');
  canvas.width    = width;
  canvas.height   = height;

  return canvas;
}

function addBackground(canvas, back){
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = back;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

}

function addCross(canvas, size, color){
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, size/2 - 10);
  ctx.lineTo(0, size/2 + 10);
  ctx.lineTo(size, size/2 + 10);
  ctx.lineTo(size, size/2 - 10);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(size/2 - 10, 0);
  ctx.lineTo(size/2 + 10, 0);
  ctx.lineTo(size/2 + 10, size);
  ctx.lineTo(size/2 - 10, size);
  ctx.closePath();
  ctx.fill();
}

function addDiamond(canvas, size, color){
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0,size/2);
  ctx.lineTo(size/2, size);
  ctx.lineTo(size, size/2);
  ctx.lineTo(size/2, 0);
  ctx.closePath();
  ctx.fill();
}

function addTriangle(canvas, size, color){
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(size/2, size);
  ctx.lineTo(size, 0);
  ctx.closePath();
  ctx.fill();
}

function addTriangleInverse(canvas, size, color){
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0,size);
  ctx.lineTo(size/2, 0);
  ctx.lineTo(size, size);
  ctx.closePath();
  ctx.fill();
}

export default textureManager;

