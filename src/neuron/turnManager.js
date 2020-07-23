import unitManager from '../resources/unit/unitManager.js';
import buildingManager from '../resources/building/buildingManager.js';
import userResources from '../resources/userResources.js';

const turnManager = {
  turn : 0,
  screen : null
};

turnManager.advance = function(){
  // Units
  var unitsWaiting = unitManager.unitsWaiting();
  if (unitsWaiting.length) {
    unitsWaiting[0].worldMap.nextState = unitsWaiting[0];
    return;
  }
  turnManager.turn++;
  for (let i = 0; i < unitManager.list.robot.length; ++i) {
    unitManager.list.robot[i].refresh();
  }
  // Buildings
  for (let i = 0; i < buildingManager.mines.length; ++i) {
    // @TODO: Generalize
    userResources.resources.MINERAL += buildingManager.mines[i].getResources().MINERAL;
  }
}

turnManager.init = function(){
  turnManager.turn = 0;
}

turnManager.reset = function(screen){
  turnManager.turn = 0;
  turnManager.screen = screen;
}

export default turnManager;

