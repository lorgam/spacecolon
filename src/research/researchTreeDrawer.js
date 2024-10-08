import GLOBALS from '../globals/globals.js';
import INPUT from '../globals/input.js';
import BaseState from '../neuron/baseState.js';
import textureManager from '../neuron/textureManager.js';
import researchTree from './researchTree.js';
import ResearchMenu from '../game_menu/researchMenu.js';

function researchTreeDrawer(parent){
  BaseState.call(this);
  this.parent = parent;
  this.clickedTech = null;
}

researchTreeDrawer.prototype = Object.create(BaseState.prototype);

researchTreeDrawer.prototype.sx = 0;
researchTreeDrawer.prototype.sy = 0;

researchTreeDrawer.prototype.update = function() {
  if (INPUT.keyboard.ARROW_LEFT.execute())  this.moveLeft();
  if (INPUT.keyboard.ARROW_RIGHT.execute()) this.moveRight();
  if (INPUT.keyboard.ARROW_DOWN.execute())  this.moveDown();
  if (INPUT.keyboard.ARROW_UP.execute())    this.moveUp();
  if (INPUT.keyboard.T.execute())           this.nextState = this.parent;
  if (INPUT.mouse.isClicked)                this.mouseClick();
}

researchTreeDrawer.prototype.mouseClick = function() {
  if (ResearchMenu.investigateBtn.isClicked()) return;
  this.clickedTech = getClickedTechnology(INPUT.mouse.x, INPUT.mouse.y - GLOBALS.topMenuHeight, this.sx, this.sy);
}

researchTreeDrawer.prototype.moveLeft = function() {
  this.sx -= 10;
  if (this.sx < 0) this.sx = 0;
}

researchTreeDrawer.prototype.moveRight = function() {
  let maxX = textureManager.textures['research']['tree'].width - GLOBALS.mainScreenWidth;
  if (maxX < 0) return;

  this.sx += 10;
  if (this.sx > maxX) this.sx = maxX;
}

researchTreeDrawer.prototype.moveUp = function() {
  this.sy -= 10;
  if (this.sy < 0) this.sy = 0;
}

researchTreeDrawer.prototype.moveDown = function() {
  let maxY = textureManager.textures['research']['tree'].height - GLOBALS.height + GLOBALS.topMenuHeight;
  if (maxY < 0) return;

  this.sy += 10;
  if (this.sy > maxY) this.sy = maxY;
}

researchTreeDrawer.prototype.draw = function() {
  const ctx = GLOBALS.context;

  ctx.drawImage(textureManager.textures['research']['tree'], this.sx, this.sy, GLOBALS.mainScreenWidth, GLOBALS.height - GLOBALS.topMenuHeight, 0, GLOBALS.topMenuHeight, GLOBALS.mainScreenWidth, GLOBALS.height - GLOBALS.topMenuHeight);

  if (this.clickedTech) {
    const texture = textureManager.textures['research'][this.clickedTech.name];
    ctx.filter = "brightness(1)";
    ctx.drawImage(texture, 0, 0, texture.width, texture.height,
      this.clickedTech.pos.x - this.sx, GLOBALS.topMenuHeight + this.clickedTech.pos.y - this.sy, researchTree.iconSize, researchTree.iconSize);
    ctx.filter = null;
  }

  ResearchMenu.draw(this.clickedTech, textureManager.textures['research']['tree'].width);
}

function getClickedTechnology(x, y, sx, sy){
  let value = researchTree.applyFunctionToAll(node => {if (x + sx > node.pos.x && x + sx < node.pos.x + researchTree.iconSize && y +sy > node.pos.y && y +sy < node.pos.y + researchTree.iconSize) return node;});
  return (typeof value === "undefined" ? null : value);
}

export default researchTreeDrawer;

