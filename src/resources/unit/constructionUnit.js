import RobotUnit from './robotUnit.js';
import naturalResourceManager from '../naturalResourceManager.js';
import userResources from '../userResources.js';
import buildingManager from '../building/buildingManager.js';
import Mine from '../building/mine.js';

function ConstructionUnit(city){
  RobotUnit.call(this, city);
}

ConstructionUnit.prototype = Object.create(RobotUnit.prototype);

ConstructionUnit.prototype.type = 'construction';

ConstructionUnit.prototype.options['MINE'] = {
    text:"mine",
    click:function(){
      buildingManager.buildMine(this.parent);
      this.parent.unSelect();
    },
    isValid : unit => {
      var tile = unit.getTile();
      return tile.resource == naturalResourceManager.resources.MINERAL && !tile.building;
    },
    isEnabled : unit => {
      return userResources.checkAvailable(Mine.prototype.getCost());
    }

  }

export default ConstructionUnit;

