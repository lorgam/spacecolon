import Point2d  from '../../../src/neuron/physics/point2d.js';

function MockMapCylindricalPoint2d(x,y,map){
	Point2d.call(this, x, y);
	this.map = map;
}

MockMapCylindricalPoint2d.prototype = Object.create(Point2d.prototype);

MockMapCylindricalPoint2d.prototype.neighbors = function() {
	let neighbors = [];
	neighbors.push(new MockMapCylindricalPoint2d((this.x + 1 + this.map.length) % this.map.length, this.y, this.map));
	neighbors.push(new MockMapCylindricalPoint2d((this.x - 1 + this.map.length) % this.map.length, this.y, this.map));

	if (this.y > 0) neighbors.push(new MockMapCylindricalPoint2d(this.x, this.y - 1, this.map));
	if (this.y < this.map[0].length - 1) neighbors.push(new MockMapCylindricalPoint2d(this.x, this.y + 1, this.map));

	return neighbors;
}

MockMapCylindricalPoint2d.prototype.movementCost = function() {return this.map[this.x][this.y];}

export default MockMapCylindricalPoint2d;

