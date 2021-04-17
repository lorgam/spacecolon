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
}

researchTreeDrawer.prototype.draw = function() {
  let context = GLOBALS.context;

  context.drawImage(textureManager.textures['research']['tree'], this.sx, 0, GLOBALS.mainScreenWidth, GLOBALS.mainScreenHeight, 0, GLOBALS.topMenuHeight, GLOBALS.mainScreenWidth, GLOBALS.mainScreenHeight);
}

export default researchTreeDrawer;

