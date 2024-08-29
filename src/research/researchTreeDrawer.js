import GLOBALS from '../globals/globals.js';
import INPUT from '../globals/input.js';
import BaseState from '../neuron/baseState.js';
import textureManager from '../neuron/textureManager.js';
import researchTree from './researchTree.js';

function researchTreeDrawer(options, parent){
  BaseState.call(this);
  this.sx = 0;
}

researchTreeDrawer.prototype = Object.create(BaseState.prototype);

researchTreeDrawer.prototype.update = function() {
  /*if (INPUT.keyboard.ARROW_LEFT.execute())  this.moveLeft();
  if (INPUT.keyboard.ARROW_RIGHT.execute()) this.moveRight();*/
}

/*researchTreeDrawer.prototype.moveLeft = function() {
  this.sx -= 10;
  if (this.sx < 0) this.sx = 0;
}

researchTreeDrawer.prototype.moveRight = function() {
  this.sx += 10;
  let maxX = textureManager.textures['research']['tree'].width - GLOBALS.mainScreenWidth;
  if (this.sx > maxX) this.sx = maxX;
}*/

researchTreeDrawer.prototype.draw = function() {
  let context = GLOBALS.context;

  context.drawImage(textureManager.textures['research']['tree'], this.sx, 0, GLOBALS.mainScreenWidth, GLOBALS.mainScreenHeight, 0, GLOBALS.topMenuHeight, GLOBALS.mainScreenWidth, GLOBALS.mainScreenHeight);
}

export default researchTreeDrawer;

