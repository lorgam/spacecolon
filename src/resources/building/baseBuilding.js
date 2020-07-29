import INPUT from '../../globals/input.js';
import BaseState from '../../neuron/baseState.js';
import textureManager from '../../neuron/textureManager.js'
import userResources from '../userResources.js'

function BaseBuilding(worldMap, pos, tile){
  BaseState.call(this);
  this.worldMap = worldMap;
  this.pos = pos;
  this.tile = tile;

  this.tile.building = this;
  this.level = 1;
  this.turnsBuilt = 0;
}

BaseBuilding.prototype = Object.create(BaseState.prototype);

BaseBuilding.prototype.getResources = userResources.getResourcesObject;
BaseBuilding.prototype.getCost = userResources.getResourcesObject;
BaseBuilding.prototype.turnsToBuild = null;

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

BaseBuilding.prototype.texture = function(){
  return textureManager.textures['buildings'][this.type];
}

export default BaseBuilding;

