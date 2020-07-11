import RobotUnit from './robotUnit.js';
import naturalResourceManager from '../naturalResourceManager.js';
import buildingManager from '../building/buildingManager.js';

function ConstructionUnit(city){
  RobotUnit.call(this, city);
}

ConstructionUnit.prototype = Object.create(RobotUnit.prototype);

ConstructionUnit.prototype.type = 'construction';

ConstructionUnit.prototype.options['MINE'] = {
    text:"mine",
    click:function(){
      buildingManager.buildMine(this.parent);
    },
    isValid:(unit) => {return unit.getTile().resource == naturalResourceManager.resources.MINERAL;}
  }

export default ConstructionUnit;

