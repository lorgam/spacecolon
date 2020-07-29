import GLOBALS from '../globals/globals.js';
import INPUT from '../globals/input.js';
import WorldGenerator from './worldGenerator.js';
import WorldMapDrawer from './worldMapDrawer.js';
import MapTile from './mapTile.js';
import ScreenStack from '../screens/screenStack.js';
import UnitManager from '../resources/unit/unitManager.js';
import BaseState from '../neuron/baseState.js';
import turnManager from '../neuron/turnManager.js';
import TopMenu from '../game_menu/topMenu.js';
import LowerMenu from '../game_menu/lowerMenu.js';
import WorldRightMenu from '../game_menu/worldRightMenu.js';
import MiniMap from '../game_menu/miniMap.js';

function WorldMap(options, parent){
  BaseState.call(this);
  this.options = options;
  this.parent = parent;
  // Init the stats object
  this.stats = [];
  for (var tileType in MapTile.prototype.tileTypes) {
    this.stats[tileType] = 0;
  }

  WorldGenerator.generate(this);

  this.tileClicked  = null;
  this.superiorSideTile  = null;

  this.typeOfView   = 0; //0: Normal, 1: Height, 2: Humidity, 3: Blocks

  WorldRightMenu.init();
}

WorldMap.prototype = Object.create(BaseState.prototype);

WorldMap.prototype.draw = function(){
  var context = GLOBALS.context;
  context.fillStyle = GLOBALS.backgroundColor;
  context.fillRect(0, 0, GLOBALS.width, GLOBALS.height);

  this.drawBackground();
  this.drawUnits();
  LowerMenu.draw(this.getTileClicked());
  TopMenu.draw(this);
  WorldRightMenu.draw(this);
  MiniMap.draw(this);
}

WorldMap.prototype.drawBackground = function(){WorldMapDrawer.drawArray[this.typeOfView](this);}
WorldMap.prototype.drawUnits = function(unit = null){
  UnitManager.list.robot.forEach((robot) => {
    if (unit == robot) robot.drawSelectedUnit();
    else robot.drawUnit();
  });
}

WorldMap.prototype.update = function(timeElapsed){
  if (INPUT.keyboard.ARROW_LEFT.execute())  this.moveLeft();
  if (INPUT.keyboard.ARROW_RIGHT.execute()) this.moveRight();
  if (INPUT.keyboard.ARROW_UP.execute())    this.moveUp();
  if (INPUT.keyboard.ARROW_DOWN.execute())  this.moveDown();

  if (INPUT.keyboard.V.execute())     this.changeView();
  if (INPUT.keyboard.C.execute())     this.centerViewonStartingPoint();
  if (INPUT.keyboard.SPACE.execute())     turnManager.advance();
  //Mouse
  if (INPUT.mouse.mainWindowClicked) this.mouseClick(INPUT.mouse.x, INPUT.mouse.y - GLOBALS.topMenuHeight);
  if (INPUT.mouse.miniMapClicked) MiniMap.mouseClick(this, INPUT.mouse.x - GLOBALS.mainScreenWidth, INPUT.mouse.y - GLOBALS.bottomOfMap());
  if (INPUT.mouse.rightMenuClicked) WorldRightMenu.mouseClick();
}

WorldMap.prototype.getTile = function(x,y){
  return {x:(~~(x/GLOBALS.tileSize) + this.topLeftX) % this.options.width,y:(~~(y/GLOBALS.tileSize) + this.topLeftY) % this.options.height};
}

WorldMap.prototype.mouseClick = function(x,y){
  this.tileClicked = this.getTile(x,y);
  //Calculate if the tile has been clicked on its superior part or its inferior
  this.superiorSideTile = ((y - (this.tileClicked.y - this.topLeftY) * GLOBALS.tileSize) / GLOBALS.tileSize) < 0.5;

  this.nextState = this.getTileClicked().getState();
}

WorldMap.prototype.moveLeft   = function(){this.topLeftX = (this.options.width + this.topLeftX - 1) % this.options.width;}
WorldMap.prototype.moveRight  = function(){this.topLeftX = (this.topLeftX + 1) % this.options.width;}
WorldMap.prototype.moveUp   = function(){if (this.topLeftY > 0) this.topLeftY = this.topLeftY - 1;}
WorldMap.prototype.moveDown   = function(){if (this.topLeftY + GLOBALS.verticalTilesToShow() < this.options.height) this.topLeftY = this.topLeftY + 1;}

WorldMap.prototype.changeView = function(){this.typeOfView = (this.typeOfView + 1) % WorldMapDrawer.drawArray.length;}

WorldMap.prototype.getTileClicked = function(){
  if (this.tileClicked) return this.map[this.tileClicked.x][this.tileClicked.y];
  return null;
}

WorldMap.prototype.centerView = function(x,y){
  this.topLeftX = (~~(x - GLOBALS.horizontalTilesToShow() / 2) + this.options.width) % this.options.width;
  this.topLeftY = ~~(y - GLOBALS.verticalTilesToShow() / 2);

  if (this.topLeftY < 0){
    this.topLeftY = 0;
    return;
  }
  if (this.topLeftY + GLOBALS.verticalTilesToShow() > this.options.height) this.topLeftY = this.options.height - GLOBALS.verticalTilesToShow();
};

WorldMap.prototype.centerViewonStartingPoint = function(){this.centerView(this.startingPointX, this.startingPointY);}

export default WorldMap;

