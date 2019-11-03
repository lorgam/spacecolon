import MapPoint2d	from '../../neuron/physics/mapPoint2d.js';

function BaseUnit(city){
	this.city = city;
	this.state = 'WAIT';
	this.goal = null;
	this.pos = new MapPoint2d(city.parent.pos.x, city.parent.pos.y);
}

BaseUnit.prototype.isWaiting = function(){
	return this.state == 'WAIT';
}

BaseUnit.prototype.moveTo = function(pos){
	this.goal = pos;
	this.state = 'MOVE';
}

export default BaseUnit;

const states = {
	'WAIT':{id:0},
	'SLEEP':{id:1},
	'MOVE':{id:2}
};

