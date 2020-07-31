import Mine from './mine.js'
import userResources from '../userResources.js';

const buildingManager = {
  buildings : [],
  queue : []
}

buildingManager.buildMine = function(unit){
  // Check cost
  let cost = Mine.prototype.getCost(), i;
  for (i in cost) userResources.resources[i] -= cost[i];

  unit.state = 'BUILD';
  var mine = new Mine(unit.worldMap, unit.pos, unit.getTile());
  buildingManager.queue.push(mine);
}

buildingManager.reset = function(){
  buildingManager.buildings = [];
  buildingManager.queue = [];
}

export default buildingManager;

