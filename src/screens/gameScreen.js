import GLOBALS    from '../globals/globals.js';
import INPUT    from '../globals/input.js';
import turnManager  from '../neuron/turnManager.js';
import WorldMap   from '../world_map/worldMap.js';
import WorldGenerator from '../world_map/worldGenerator.js';
import userResources  from '../resources/userResources.js';
import unitManager  from '../resources/unit/unitManager.js';
import buildingManager  from '../resources/building/buildingManager.js';
import OptionsScreen  from './optionsScreen.js';
import ScreenStack  from './screenStack.js';

function GameScreen(){
  turnManager.reset(this);
  userResources.init();
  unitManager.reset();
  buildingManager.reset();

  this.totalTime    = 0.0;

  this.worldMap   = new WorldMap(WorldGenerator.generateOptions({type : 'normal'}), this);
  this.currentState = this.worldMap;
}

GameScreen.prototype.update = function(timeElapsed) {
  this.totalTime += timeElapsed;

  if (INPUT.keyboard.O.execute()){ //Otions menu
    ScreenStack.addScreen(new OptionsScreen());
    INPUT.resetKeyboard();
    return;
  }
  if (INPUT.keyboard.ESC.execute()) { //Go back
    if (this.currentState == this.worldMap) ScreenStack.removeScreen();
    else this.currentState.nextState = this.worldMap;
    INPUT.resetKeyboard();
  }
  this.currentState.changeState(this);
  this.currentState.update(timeElapsed);
}

GameScreen.prototype.draw = function() {this.currentState.draw();}

export default GameScreen;

