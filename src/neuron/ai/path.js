import aStar from	'./path/aStar.js';

const path = {
		worldMap : null
};

path.find = function(unit){
	return aStar(unit.pos, unit.goal, h);
}

var h = (pos, g) => {
		//return pos.distance(g);
		return 0;
};

export default path;

