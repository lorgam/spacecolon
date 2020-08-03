import unitManager from '../resources/unit/unitManager.js';
import buildingManager from '../resources/building/buildingManager.js';
import cityManager from '../resources/city/cityManager.js';
import userResources from '../resources/userResources.js';
import GLOBALS from '../globals/globals.js'

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
  //Cities
  cityManager.cities.forEach(city => userResources.addResources(city.getResources()));
  // Buildings
  buildingManager.buildings.forEach(building => userResources.addResources(building.getResources()));
  //Construction queue
  buildingManager.queue.forEach(building => {
    if (building.tile.unit.state == 'BUILD') {
      building.tile.unit.remainingMoves = 0;
      building.turnsBuilt++;

      var mapContext = building.worldMap.resourcesCanvas.getContext('2d');
      mapContext.globalAlpha = building.turnsBuilt / building.turnsToBuild;
      mapContext.clearRect(building.pos.x * GLOBALS.maxTileSize(), building.pos.y * GLOBALS.maxTileSize(), GLOBALS.maxTileSize(), GLOBALS.maxTileSize());
      mapContext.drawImage(building.texture(), building.pos.x * GLOBALS.maxTileSize(), building.pos.y * GLOBALS.maxTileSize(), GLOBALS.maxTileSize(), GLOBALS.maxTileSize());
      mapContext.globalAlpha = 1;

      if (building.turnsBuilt == building.turnsToBuild) {
        buildingManager.buildings.push(building);
        building.tile.unit.state = 'WAIT'
      }
    }
  });

  buildingManager.queue = buildingManager.queue.filter(building => building.turnsBuilt != building.turnsToBuild);

  turnManager.turn++;
  unitManager.list.robot.forEach(robot => robot.refresh());
}

turnManager.init = function(){
  turnManager.turn = 0;
}

turnManager.reset = function(screen){
  turnManager.turn = 0;
  turnManager.screen = screen;
}

export default turnManager;

