import Point2d from './point2d.js';

function MapPoint2d(x, y, worldMap){
	Point2d.call(this, x, y);
	this.worldMap = worldMap;
}

MapPoint2d.prototype = Object.create(Point2d.prototype);

MapPoint2d.prototype.neighbors = function() {
	var neighbors = Point2d.prototype.neighbors.call(this);
	var options = this.worldMap.options;
	neighbors = neighbors.filter(e => e.y > options.height || e.y < 0);
	neighbors.forEach(e => {e.x = (e.x + options.width) % options.width;});
}

export default MapPoint2d;

