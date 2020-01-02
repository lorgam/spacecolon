import aStar from	'./path/aStar.js';

const path = {};

path.find = function(unit){
	return aStar(unit.pos, unit.goal, h);
}

var h = (pos, g) => pos.distance(g);

export default path;

