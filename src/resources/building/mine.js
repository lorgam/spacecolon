import BaseBuilding from './baseBuilding.js'

function Mine(worldMap, pos){
  BaseBuilding.call(this, worldMap, pos);
}

Mine.prototype = Object.create(BaseBuilding.prototype);

Mine.prototype.type = 'mine';

Mine.prototype.getResources = () => Object.assign(BaseBuilding.prototype.getResources.call(this), {MINERAL:10})
Mine.prototype.getCost = () => Object.assign(BaseBuilding.prototype.getResources.call(this), {MINERAL:100})

export default Mine;
