import GLOBALS from '../../globals/globals.js';
import INPUT from '../../globals/input.js';
import texts from '../../globals/texts.js';
import aux from '../../globals/auxiliar.js';
import MapPoint2d from '../../neuron/physics/mapPoint2d.js';
import textureManager from '../../neuron/textureManager.js';
import AI from '../../neuron/ai/ai.js';
import BaseState from '../../neuron/baseState.js';
import InnerRightMenu from '../../game_menu/innerRightMenu.js';

function BaseUnit(city){
  BaseState.call(this);
  this.city = city;
  this.state = 'WAIT';
  this.goal = null;
  this.worldMap = city.parent.parent;
  this.pos = new MapPoint2d(city.parent.pos.x, city.parent.pos.y, this.worldMap);
  this.route = null;
  this.remainingMoves = this.moveRange;
}

BaseUnit.prototype = Object.create(BaseState.prototype);

BaseUnit.prototype.type = null;
BaseUnit.prototype.moveRange = 1;

BaseUnit.prototype.options = {
  "FORTIFY" : {
    text:"fortify",
    click:function(){
      this.parent.state = "FORTIFY";
      this.parent.unSelect();
    },
    isValid : unit => {return true;},
    isEnabled : unit => {return true;}
  }
}

BaseUnit.prototype.refresh = function() {
  this.remainingMoves = this.moveRange;
}

BaseUnit.prototype.text = function(){
  return texts.getText('units', this.type);
}

BaseUnit.prototype.texture = function(){
  return textureManager.textures['userResources'][this.type];
}

BaseUnit.prototype.isWaiting = function(){
  if (this.state == 'MOVE') {
      this.move();
  }
  return this.state == 'WAIT' && this.remainingMoves > 0;
}

BaseUnit.prototype.goTo = function(pos){
  this.goal = new MapPoint2d(pos.x, pos.y, this.worldMap);

  this.route = AI.path.find(this).reverse();
  if (this.route == null || this.route.length < 2) return;

  this.state = 'MOVE';
  this.move();
}

BaseUnit.prototype.move = function(){
  this.worldMap.map[this.pos.x][this.pos.y].unit = null;

  let moves = (this.remainingMoves < this.route.length ? this.remainingMoves : this.route.length);
  this.route = this.route.slice(moves);
  this.pos = this.route[0];
  this.remainingMoves -= moves;

  this.worldMap.map[this.pos.x][this.pos.y].unit = this;

  if (this.pos.equals(this.goal)) {
      this.state = 'WAIT';
  }
}

BaseUnit.prototype.getTile = function(){
  return this.worldMap.map[this.pos.x][this.pos.y];
}

//////////  EVENTS  //////////
BaseUnit.prototype.select = function() {
  this.worldMap.centerView(this.pos.x, this.pos.y);
  InnerRightMenu.configure(this);
}

//////////  DRAWING  //////////

BaseUnit.prototype.draw = function() {
  this.worldMap.drawBackground();
  this.worldMap.drawUnits(this);
  InnerRightMenu.draw(this);
}

BaseUnit.prototype.drawUnit = function() {
  let x = (this.pos.x - this.worldMap.topLeftX + this.worldMap.options.width ) % this.worldMap.options.width;
  let y = (this.pos.y - this.worldMap.topLeftY + this.worldMap.options.height) % this.worldMap.options.height;
  if (x < GLOBALS.horizontalTilesToShow() && y < GLOBALS.verticalTilesToShow()) GLOBALS.context.drawImage(this.texture(), x * GLOBALS.tileSize, y * GLOBALS.tileSize + GLOBALS.topMenuHeight, GLOBALS.tileSize, GLOBALS.tileSize);
}

BaseUnit.prototype.drawSelectedUnit = function() {
  let ctx = GLOBALS.context;
  let alpha = ctx.globalAlpha;
  ctx.globalAlpha = Math.lerp(0.5, 1, aux.gradient);
  this.drawUnit();
  ctx.globalAlpha = alpha;
};

//////////  UPDATING  //////////

BaseUnit.prototype.update = function(timeElapsed) {
  if (INPUT.mouse.mainWindowClicked) {
    this.goTo(this.worldMap.getTile(INPUT.mouse.x, INPUT.mouse.y - GLOBALS.topMenuHeight));
    this.unSelect();
  }
  InnerRightMenu.click(this);
};

BaseUnit.prototype.unSelect = function() {
  this.nextState = this.worldMap;
};

export default BaseUnit;

