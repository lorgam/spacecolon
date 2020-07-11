import Mine from './mine.js'

const buildingManager = {
  mines : []
}

buildingManager.buildMine = function(unit){
  buildingManager.mines.push(new Mine(unit.worldMap, unit.pos));
  // @TODO: Draw the mine
}

export default buildingManager;
