import RobotUnit from './robotUnit.js';

function ConstructionUnit(city){
  RobotUnit.call(this, city);
}

ConstructionUnit.prototype = Object.create(RobotUnit.prototype);

ConstructionUnit.prototype.type = 'construction';

export default ConstructionUnit;

