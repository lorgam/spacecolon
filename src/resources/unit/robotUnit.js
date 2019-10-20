import BaseUnit	from './baseUnit.js';

function RobotUnit(city){
	BaseUnit.call(this, city);
}

RobotUnit.prototype = Object.create(BaseUnit.prototype);

export default RobotUnit;

