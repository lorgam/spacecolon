// Implementation of the pseudocode for the A* algrithm in wikipedia
// https://en.m.wikipedia.org/wiki/A*_search_algorithm
function aStar(start, goal, h){
	var openSet = [start];
	var cameFrom = [];
	var gScore = [];
	var closedSet = [];
	var fScore = [];
	var filtered, i, pos, gScorePos, tentative_gScore, current;

	gScore.push({pos:start,score:0});
	fScore.push({pos:start,score:h(start, goal)});

	while (openSet.length > 0) {
		current = lowestFScore(openSet, fScore);
		if (current.pos.equals(goal)) return reconstruct_path(cameFrom, current.pos);

		openSet = openSet.filter(e => !e.equals(current.pos));
		closedSet.push(current.pos);

		current.pos.neighbors().forEach(e => {
			if (findPos(e, closedSet)) return;

			gScorePos = gScore.filter(e => !current.pos.equals(e));
			tentative_gScore = gScorePos[0].score + d(current.pos, e);

			pos = findInd(e, gScore);
			if (pos == -1 || gScore[pos].score > tentative_gScore){
				filtered = cameFrom.filter(e => current.pos.equals(e.from));
				if (filtered.length) {
					filtered[0].pos = e;
				} else cameFrom.push({pos:e,from:current});

				i = gScore.forEach((el, i) => {if (el.pos.equals(e)) return i;}) || -1;
				if (i == -1) {
					gScore.push({pos:e,score:tentative_gScore});
					fScore.push({pos:e,score:tentative_gScore + h(e, goal)});
				} else {
					gScore[i].score = tentative_gScore;
					fScore[i].score = tentative_gScore + h(e, goal);
				}

				if (!findPos(e, openSet)) openSet.push(e);
			}
		});

	}
	return false;
}

var reconstruct_path = (cameFrom, current) => {
	var total_path = [], cameFromF;
	do {
		total_path.push(current);
		cameFromF = cameFrom.filter(e => current.equals(e.pos));
		current = (cameFromF.length ? cameFromF[0].from.pos : false);
	} while(current);
	return total_path;
}

var findPos = (pos, arr) => {
	for (var i = 0; i < arr.length; i++) if (arr[i].x == pos.x && arr[i].y == pos.y) return arr[i];
	return false;
}

var findInd = (pos, arr) => arr.forEach((e,i) => { if (pos.equals(e)) return i;}) || -1;

var removePos = (pos, arr) => {
	arr = arr.filter(e => {
		for (let i = 0; i < arr.length; i++) if (arr[i].x == pos.x && arr[i].y == pos.y) return false;
		return true;
	});
}

var lowestFScore = (openSet, fScore) => {
	var res = null, min = Number.MAX_VALUE;

	fScore.forEach((val, ind) => {
		if (val.score < min && findPos(val.pos, openSet)) {
			res = val;
			min = val.score;
		}
	})

	return res;
}

var d = (curr, neig) => 1; // @TODO: Add terrain penalty to movement

export default aStar;

