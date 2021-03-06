import GLOBALS  from '../../globals/globals.js';
import INPUT  from '../../globals/input.js';
import InnerRightMenu  from '../../game_menu/innerRightMenu.js';
import CityLowerMenu from '../../game_menu/cityLowerMenu.js';
import unitManager from '../unit/unitManager.js';
import unitFactory from '../unit/unitFactory.js';
import userResources from '../userResources.js';
import BaseState from '../../neuron/baseState.js';

function City(parent){
  BaseState.call(this);
  this.parent = parent;
  this.context = GLOBALS.context;
  this.queue = [];
}

City.prototype = Object.create(BaseState.prototype);

City.prototype.options = {
  "ROBOT" : {
    text:"construction",
    click:function(){
      this.parent.addToConstructionQueue(unitFactory['constructionRobot'](this.parent));
    },
    isValid:(city) => {return true;},
    isEnabled : unit => {return true;}
  }
}

City.prototype.text = function() {
  return "city";
}

City.prototype.getResources = function() {
  return Object.assign(userResources.getResourcesObject(), {MINERAL:5});
}

//////////  EVENTS  //////////
City.prototype.select = function() {
  this.parent.centerView();
  InnerRightMenu.configure(this);
}

City.prototype.unSelect = function() {
  this.nextState = this.parent.parent;
};

City.prototype.processTurn = function() {
  userResources.addResources(this.getResources());
  if (this.queue.length) {
    this.queue[0].remainingTurnsToBuild--;
    if (this.queue[0].remainingTurnsToBuild <= 0) {
      // TODO: Check for conflicts with other units at the same position
      unitManager.addRobot(this.queue.shift());
    }
  }
}

//////////  CONSTRUCTION QUEUE  //////////
City.prototype.addToConstructionQueue = function(obj) {
  if (userResources.checkAvailable(obj.cost)) {
    userResources.removeResources(obj.cost)
    this.queue.push(obj);
    this.unSelect();
  }
}

City.prototype.removeFromConstructionQueue = function() {
  let obj = this.parent.queue.pop();
  userResources.addResources(obj.cost);
}

//////////  UPDATING  //////////
City.prototype.update = function() {
  if (INPUT.mouse.mainWindowClicked) this.unSelect();
  InnerRightMenu.click(this);
}

//////////  DRAWING  //////////

City.prototype.draw = function() {
  this.drawBackground();
  InnerRightMenu.draw();
  CityLowerMenu.draw(this);
}

City.prototype.drawBackground = function() {
  this.parent.parent.draw();
  this.context.globalAlpha = 0.5;
  this.context.fillStyle = "#008";
  this.context.fillRect(0, GLOBALS.topMenuHeight, GLOBALS.mainScreenWidth, GLOBALS.mainScreenHeight);
  this.context.globalAlpha = 1;
}

export default City;

