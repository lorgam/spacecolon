import BaseBuilding from './baseBuilding.js'

function Mine(worldMap, pos, tile){
  BaseBuilding.call(this, worldMap, pos, tile);
}

Mine.prototype = Object.create(BaseBuilding.prototype);

Mine.prototype.type = 'mine';

Mine.prototype.getResources = () => Object.assign(BaseBuilding.prototype.getResources.call(this), {MINERAL:10})
Mine.prototype.getCost = () => Object.assign(BaseBuilding.prototype.getResources.call(this), {MINERAL:100})
BaseBuilding.prototype.turnsToBuild = 4;

export default Mine;
