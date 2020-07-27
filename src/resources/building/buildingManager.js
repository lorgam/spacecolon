import Mine from './mine.js'
import GLOBALS from '../../globals/globals.js'

const buildingManager = {
  mines : []
}

buildingManager.buildMine = function(unit){
  // @TODO: Add a construction queue
  var mine = new Mine(unit.worldMap, unit.pos);
  buildingManager.mines.push(mine);
  unit.getTile().building = mine;
  // Draw the mine on the world map
  var mapContext = unit.worldMap.mapCanvas.getContext('2d');
  mapContext.drawImage(mine.texture(), unit.pos.x * GLOBALS.maxTileSize(), unit.pos.y * GLOBALS.maxTileSize(), GLOBALS.maxTileSize(), GLOBALS.maxTileSize());
}

buildingManager.reset = function(){
  buildingManager.mines = [];
}

export default buildingManager;
