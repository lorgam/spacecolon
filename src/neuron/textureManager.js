import GLOBALS from '../globals/globals.js';
import MapTile from '../world_map/mapTile.js';
import naturalResourceManager from '../resources/naturalResourceManager.js';
import researchTree from '../research/researchTree.js';

const textureManager = {
  textures : [],
  tileSize: 100,
  load : function(){
    textureManager.textures['mapTile'] = getTilesTextures();
    textureManager.textures['userResources'] = getUserResourcesTextures();
    textureManager.textures['naturalResources'] = getNaturalResourcesTextures();
    textureManager.textures['buildings'] = getBuildingsTextures();
    textureManager.textures['general'] = getGeneralTextures();
    textureManager.textures['research'] = getResearchTextures();
  },
}

//////////////// Generate textures ////////////////
function getTilesTextures(){
  let textures = [], i, canvas;

  for (i in MapTile.prototype.tileTypes) {
    canvas = createCanvas(textureManager.tileSize, textureManager.tileSize);
    addBackground(canvas, MapTile.prototype.tileTypes[i].color);
    textures[i] = canvas;
  }

  return textures;
}

function getUserResourcesTextures(){
  let textures = [], canvas;

  canvas = createCanvas(textureManager.tileSize, textureManager.tileSize);
  addTriangle(canvas, textureManager.tileSize, "#FF0");
  textures['construction'] = canvas;

  return textures;
}

function getNaturalResourcesTextures(){
  let textures = [], i, canvas;

  for (i in naturalResourceManager.resources) {
    canvas = createCanvas(textureManager.tileSize, textureManager.tileSize);
    addDiamond(canvas, textureManager.tileSize, naturalResourceManager.resources[i].color);
    textures[i] = canvas;
  }

  return textures;
}

function getBuildingsTextures(){
  let textures = [], i, canvas;

  canvas = createCanvas(textureManager.tileSize, textureManager.tileSize);
  addCross(canvas, textureManager.tileSize, "#FFF");
  textures['mine'] = canvas;

  return textures;
}

function getGeneralTextures(){
  let textures = [], canvas;

  canvas = createCanvas(textureManager.tileSize, textureManager.tileSize);
  addTriangleInverse(canvas, textureManager.tileSize, "#0FF");
  textures['city'] = canvas;

  return textures;
}

function getResearchTextures(){
  let textures = [], i, canvas, x, y, current, child;
  let columnWidth = 300, boxMargin = 15;
  let boxWidth = columnWidth -boxMargin * 2, boxHeight = 100;

  let root = researchTree.root;
  let levels = root.level + 1;

  canvas = createCanvas(levels * columnWidth, GLOBALS.mainScreenHeight);
  let ctx = canvas.getContext('2d');
  ctx.font = GLOBALS.buttonFont;

  for (i = 0; i < levels; i++){
    ctx.fillStyle = (i % 2 ? "#CB8F1E" : "#FFCF75");
    ctx.fillRect(i * columnWidth, 0, columnWidth, GLOBALS.mainScreenHeight);
  }

  let pending = [root], visited = [];
  while (pending.length > 0) {
    current = pending.shift();
    visited.push(current);

    x = (levels - current.level - 1) * columnWidth + boxMargin;
    y = current.levelPos * ( boxHeight + boxMargin);
    ctx.fillStyle = "#FFF";
    ctx.fillRect(x, y, boxWidth, boxHeight);
    ctx.fillStyle = "#000";
    ctx.fillText(current.name, x + 5, y + 20);

    for (i in current.children) {
      child = current.children[i];
      if (!visited.includes(child) && !pending.includes(child)) pending.push(child);
    }
  }

  textures['tree'] = canvas;

  return textures;
}
//////////////// Drawings ////////////////

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

