import GLOBALS  from '../../globals/globals.js';
import INPUT  from '../../globals/input.js';
import InnerRightMenu  from '../../game_menu/innerRightMenu.js';
import unitManager from '../unit/unitManager.js';
import BaseState from '../../neuron/baseState.js';

function City(parent){
  BaseState.call(this);
  this.parent = parent;
  this.context = GLOBALS.context;
  // city resources
  unitManager.addConstructionRobot(this);
}

City.prototype = Object.create(BaseState.prototype);

City.prototype.options = {
  "ROBOT" : {
    text:"construction",
    click:function(){
      // @TODO: Implement
      this.parent.unSelect();
    },
    isValid:(city) => {return true;}
  }
}

City.prototype.text = function() {
  return "city";
}

//////////  EVENTS  //////////
City.prototype.select = function() {
  this.parent.centerView();
  InnerRightMenu.configure(this);
}

//////////  UPDATING  //////////

City.prototype.update = function() {
  if (INPUT.mouse.mainWindowClicked) this.unSelect();
  InnerRightMenu.click(this);
}

City.prototype.unSelect = function() {
  this.nextState = this.parent.parent;
};

//////////  DRAWING  //////////

City.prototype.draw = function() {
  this.drawBackground();
  InnerRightMenu.draw();
}

City.prototype.drawBackground = function() {
  this.parent.parent.draw();
  this.context.globalAlpha = 0.5;
  this.context.fillStyle = "#008";
  this.context.fillRect(0, GLOBALS.topMenuHeight, GLOBALS.mainScreenWidth, GLOBALS.mainScreenHeight);
  this.context.globalAlpha = 1;
}

export default City;

