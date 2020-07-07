import BaseUnit from './baseUnit.js';

function RobotUnit(city){
  BaseUnit.call(this, city);

  this.life = this.maxLife;
}

RobotUnit.prototype = Object.create(BaseUnit.prototype);

RobotUnit.prototype.type = 'robots';
RobotUnit.prototype.maxLife = 100;

export default RobotUnit;

