import Mine from './mine.js'
import GLOBALS from '../../globals/globals.js'
import textureManager from '../../neuron/textureManager.js'

const buildingManager = {
  mines : []
}

buildingManager.buildMine = function(unit){
  // @TODO: Add a construction queue
  buildingManager.mines.push(new Mine(unit.worldMap, unit.pos));
  var mapContext = unit.worldMap.mapCanvas.getContext('2d');
  mapContext.drawImage(textureManager.textures['buildings']['mine'], unit.pos.x * GLOBALS.maxTileSize(), unit.pos.y * GLOBALS.maxTileSize(), GLOBALS.maxTileSize(), GLOBALS.maxTileSize());
}

export default buildingManager;
