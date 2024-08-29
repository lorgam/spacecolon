import GLOBALS from '../globals/globals.js';
import INPUT from '../globals/input.js';
import BaseState from '../neuron/baseState.js';
import textureManager from '../neuron/textureManager.js';
import researchTree from './researchTree.js';

function researchTreeDrawer(parent){
  BaseState.call(this);
  this.parent = parent;
}

researchTreeDrawer.prototype = Object.create(BaseState.prototype);

researchTreeDrawer.prototype.sx = 0;
researchTreeDrawer.prototype.sy = 0;

researchTreeDrawer.prototype.update = function() {
  const texture = textureManager.textures['research']['tree'];

  if (INPUT.keyboard.ARROW_LEFT.execute())  this.moveLeft();
  if (INPUT.keyboard.ARROW_RIGHT.execute()) this.moveRight();
  if (INPUT.keyboard.ARROW_DOWN.execute())  this.moveDown();
  if (INPUT.keyboard.ARROW_UP.execute())    this.moveUp();

  if (INPUT.keyboard.T.execute())  this.nextState = this.parent;

  if (INPUT.mouse.mainWindowClicked) this.mouseClick(INPUT.mouse.x, INPUT.mouse.y - GLOBALS.topMenuHeight);
}

researchTreeDrawer.prototype.mouseClick = function(x, y) {
  let clickedTech = getClickedTechnology(x, y);
  if (clickedTech) console.log(clickedTech);
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
  let maxY = textureManager.textures['research']['tree'].height - GLOBALS.mainScreenHeight;
  if (maxY < 0) return;

  this.sy += 10;
  if (this.sy > maxY) this.sy = maxY;
}

researchTreeDrawer.prototype.draw = function() {
  const ctx = GLOBALS.context;

  this.parent.draw();
  ctx.drawImage(textureManager.textures['research']['tree'], this.sx, this.sy, GLOBALS.mainScreenWidth, GLOBALS.mainScreenHeight, 0, GLOBALS.topMenuHeight, GLOBALS.mainScreenWidth, GLOBALS.mainScreenHeight);
}

function getClickedTechnology(x,y){
  let pending = [researchTree.root], visited = [], current;
  while (pending.length > 0) {
    current = pending.shift();
    visited.push(current);

    if (x > current.pos.x && x < current.pos.x + researchTree.iconSize && y > current.pos.y && y < current.pos.y + researchTree.iconSize) return current;

    for (let idx in current.children) {
      let child = current.children[idx];
      if (!visited.includes(child) && !pending.includes(child)) pending.push(child);
    }
  }

  return null;
}

export default researchTreeDrawer;

