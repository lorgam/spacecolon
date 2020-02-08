import GLOBALS  from '../../globals/globals.js';
import INPUT  from '../../globals/input.js';
import CityRightMenu  from '../../game_menu/cityRightMenu.js';
import unitManager from '../../resources/unit/unitManager.js';
import BaseState from '../../neuron/baseState.js';

function City(parent){
  BaseState.call(this);
  this.parent = parent;
  this.context = GLOBALS.context;
  // city resources
  unitManager.addRobot(this);
}

City.prototype = Object.create(BaseState.prototype);

City.prototype.text = function() {
  return "city";
}

//////////  EVENTS  //////////
City.prototype.select = function() {
  CityRightMenu.configure(this);
}

//////////  UPDATING  //////////

City.prototype.update = function() {
  if (INPUT.mouse.mainWindowClicked) this.unSelect();
  CityRightMenu.click(this);
}

City.prototype.unSelect = function() {
  this.nextState = this.parent.parent;//this.nextState = this.worldMap;
};

//////////  DRAWING  //////////

City.prototype.draw = function() {
  this.drawBackground();
  CityRightMenu.draw();
}

City.prototype.drawBackground = function() {
  this.parent.parent.draw();
  this.context.globalAlpha = 0.5;
  this.context.fillStyle = "#008";
  this.context.fillRect(0, GLOBALS.topMenuHeight, GLOBALS.mainScreenWidth, GLOBALS.mainScreenHeight);
  this.context.globalAlpha = 1;
}

export default City;

