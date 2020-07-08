import RobotUnit from './robotUnit.js';
import naturalResourceManager from '../naturalResourceManager.js';

function ConstructionUnit(city){
  RobotUnit.call(this, city);
}

ConstructionUnit.prototype = Object.create(RobotUnit.prototype);

ConstructionUnit.prototype.type = 'construction';

ConstructionUnit.prototype.options['MINE'] = {
    text:"mine",
    click:function(){
      console.log(this.parent);
    },
    isValid:(unit) => {return unit.getTile().resource == naturalResourceManager.resources.MINERAL;}
  }

export default ConstructionUnit;

