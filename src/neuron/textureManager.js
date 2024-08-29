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
  addPolygon(canvas, textureManager.tileSize, 6, "#FF0");
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
  addStar(canvas, textureManager.tileSize, 5, "#0FF");
  textures['city'] = canvas;

  return textures;
}

function getResearchTextures(){
  const padding = 50;
  const height = padding + (researchTree.root.level + 1) * (researchTree.iconSize + padding);
  const width = padding + researchTree.maxWidth * (researchTree.iconSize + padding);

  let textures = [];
  let canvas = createCanvas(width, height), canvasIcons = createCanvas(width, height), canvasLines = createCanvas(width, height);
  let ctx = canvas.getContext('2d'), ctxIcons = canvasIcons.getContext('2d'), ctxLines = canvasLines.getContext('2d');
  // Background
  ctx.fillStyle = "#CB8F1E";
  ctx.fillRect(0, 0, width, height);
  // Line colors
  ctxLines.fillStyle = "#FFF";

  let pending = [researchTree.root], visited = [];
  while (pending.length > 0) {
    let current = pending.shift();
    const techsPerLevel = researchTree.techPerLevel[current.level];
    const margin = (width - (padding + researchTree.iconSize) * techsPerLevel) / 2;
    // Position the current tech
    const x = margin + current.levelPos * (padding + researchTree.iconSize);
    const y = padding + (researchTree.root.level - current.level) * (padding + researchTree.iconSize);
    current.pos = {x:x, y:y}

    let icon = getIconForTech(current.icon);
    textures[current.name] = icon;

    //Draw the icon
    ctxIcons.drawImage(icon, x, y, researchTree.iconSize, researchTree.iconSize);

    for (let i in current.children) {
      let child = current.children[i];
      if (!visited.includes(child) && !pending.includes(child)) pending.push(child);
    }

  }

  pending = [researchTree.root], visited = [];
  while (pending.length > 0) {
    let current = pending.shift();
    // Draw the lines that connects this tech with its parents
    current.parents.forEach((parent) => {
      ctxLines.beginPath();
      ctxLines.moveTo(parent.pos.x + researchTree.iconSize / 2, parent.pos.y + researchTree.iconSize / 2);
      ctxLines.lineTo(current.pos.x + researchTree.iconSize / 2, current.pos.y + researchTree.iconSize / 2);
      ctxLines.stroke();
    });
    for (let i in current.children) {
      let child = current.children[i];
      if (!visited.includes(child) && !pending.includes(child)) pending.push(child);
    }
  }

  ctx.drawImage(canvasLines, 0, 0, width, height);
  ctx.filter = "brightness(0.75)";
  ctx.drawImage(canvasIcons, 0, 0, width, height);
  ctx.filter = null;

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

function addPolygon(canvas, size, sides, color){
  const radius = size/2;
  const step = Math.PI * 2 / sides;

  var ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(radius * 2, radius);

  for (let i = 1; i < sides; i++) {
    const angle = step * i;
    ctx.lineTo(radius + Math.cos(angle) * radius, radius + Math.sin(angle) * radius);
  }

  ctx.closePath();
  ctx.fill();
}

function addStar(canvas, size, sides, color){
  const externalRadius = size/2;
  const internalRadius = size/4;
  const step = Math.PI * 2 / sides;

  var ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(externalRadius * 2, externalRadius);

  for (let i = 0; i < sides; i++) {
    let angle = step * i;
    ctx.lineTo(externalRadius + Math.cos(angle) * externalRadius, externalRadius + Math.sin(angle) * externalRadius);
    angle += step / 2;
    ctx.lineTo(externalRadius + Math.cos(angle) * internalRadius, externalRadius + Math.sin(angle) * internalRadius);
  }

  ctx.closePath();
  ctx.fill();
}

function getIconForTech(icon){
  const size = textureManager.tileSize;
  let canvas = createCanvas(size, size);
  let ctx = canvas.getContext('2d');
  switch (icon.type){
    case "polygon":
      addPolygon(canvas, size, icon.sides, icon.color);
      break;
    case "star":
      addStar(canvas, size, icon.sides, icon.color);
      break;
    default:
      ctx.fillStyle = "#FFF";
      ctx.fillRect(0, 0 , size, size);
  }
  return canvas;
}

export default textureManager;

