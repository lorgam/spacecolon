import INPUT from '../../globals/input.js';
import BaseState from '../../neuron/baseState.js';

function BaseBuilding(worldMap, pos){
  BaseState.call(this);
  this.worldMap = worldMap;
  this.pos = pos;
  this.level = 1;
}

BaseBuilding.prototype = Object.create(BaseState.prototype);

BaseBuilding.prototype.draw = function() {
  this.worldMap.drawBackground();
  this.worldMap.drawUnits();
  //RightMenu.draw(this);
}

BaseBuilding.prototype.update = function(timeElapsed) {
  if (INPUT.mouse.mainWindowClicked) {
    this.unSelect();
  }
  //RightMenu.click(this);
};

BaseBuilding.prototype.select = function() {
  this.worldMap.centerView(this.pos.x, this.pos.y);
  //RightMenu.configure(this);
}

BaseBuilding.prototype.unSelect = function() {
  this.nextState = this.worldMap;
};

export default BaseBuilding;

