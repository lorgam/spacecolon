import Point2d from './point2d.js';

function MapPoint2d(x, y, worldMap){
	Point2d.call(this, x, y);
	this.worldMap = worldMap;
	this.movementCost = 1;
}

MapPoint2d.prototype = Object.create(Point2d.prototype);

MapPoint2d.prototype.neighbors = function() {
	var neighbors = Point2d.prototype.neighbors.call(this);
	var options = this.worldMap.options;

	neighbors = neighbors.filter(e => !(e.y > options.height - 1 || e.y < 0));

  var res = [];
  for (let i = 0; i < neighbors.length; ++i) {
			let e = neighbors[i];
			res.push(new MapPoint2d((e.x + options.width) % options.width, e.y, this.worldMap));
	}

  return res;
}

export default MapPoint2d;

