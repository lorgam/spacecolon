import Point2d  from '../../../src/neuron/physics/point2d.js';

function MockMapPoint2d(x,y,map){
	Point2d.call(this, x, y);
	this.map = map;
}

MockMapPoint2d.prototype = Object.create(Point2d.prototype);

MockMapPoint2d.prototype.neighbors = function() {
	let neighbors = [];
	if (this.x > 0) neighbors.push(new MockMapPoint2d(this.x - 1, this.y, this.map));
	if (this.y > 0) neighbors.push(new MockMapPoint2d(this.x, this.y - 1, this.map));
	if (this.x < this.map.length - 1) neighbors.push(new MockMapPoint2d(this.x + 1, this.y, this.map));
	if (this.y < this.map[0].length - 1) neighbors.push(new MockMapPoint2d(this.x, this.y + 1, this.map));

	return neighbors;
}

MockMapPoint2d.prototype.movementCost = function() {return this.map[this.x][this.y];}

export default MockMapPoint2d;

