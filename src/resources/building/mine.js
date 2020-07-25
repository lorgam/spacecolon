import BaseBuilding from './baseBuilding.js'

function Mine(worldMap, pos){
  BaseBuilding.call(this, worldMap, pos);
}

Mine.prototype = Object.create(BaseBuilding.prototype);

Mine.prototype.getResources = function() {
  return {MINERAL:this.level * 10};
}

export default Mine;
