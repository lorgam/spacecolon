import Point2d from './point2d.js';

function MapPoint2d(x, y, worldMap){
	Point2d.call(this, x, y);
	this.worldMap = worldMap;
}

MapPoint2d.prototype = Object.create(Point2d.prototype);

MapPoint2d.prototype.neighbors = function() {
	let neighbors = [];
	var options = this.worldMap.options;

	neighbors.push(new MapPoint2d((this.x + 1 + options.width) % options.width, this.y, this.worldMap));
	neighbors.push(new MapPoint2d((this.x - 1 + options.width) % options.width, this.y, this.worldMap));
	if (this.y > 0) neighbors.push(new MapPoint2d(this.x, this.y - 1, this.worldMap));
	if (this.y < options.height - 1) neighbors.push(new MapPoint2d(this.x, this.y + 1, this.worldMap));

  return neighbors;
}

MapPoint2d.prototype.movementCost = function() {
	return this.worldMap.map[this.x][this.y].movementCost();
}

MapPoint2d.prototype.distance = function(p) {
	let latDistance = Math.abs(p.x - this.x);
	let invDistance = this.worldMap.options.width - latDistance;

	latDistance = (latDistance > invDistance ? invDistance : latDistance);
	return latDistance + Math.abs(p.y - this.y);
};

export default MapPoint2d;

