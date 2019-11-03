import unitManager	from '../resources/unit/unitManager.js';

const turnManager = {
	turn : 0,
	screen : null
};

turnManager.advance = function(){
	var unitsWaiting = unitManager.unitsWaiting();
	if (unitsWaiting.length) turnManager.screen.selectUnit(unitsWaiting[0]);
	else turnManager.turn++;
}

turnManager.init = function(){
	turnManager.turn = 0;
}

turnManager.reset = function(screen){
	turnManager.turn = 0;
	turnManager.screen = screen;
}

export default turnManager;

