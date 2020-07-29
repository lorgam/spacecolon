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

  unitManager.list.robot.forEach(robot => robot.refresh());
  // Buildings
  buildingManager.buildings.forEach(building => {
    let res = building.getResources();
    for (let i in res) userResources.resources[i] += res[i];
  });

  turnManager.turn++;
}

turnManager.init = function(){
  turnManager.turn = 0;
}

turnManager.reset = function(screen){
  turnManager.turn = 0;
  turnManager.screen = screen;
}

export default turnManager;

