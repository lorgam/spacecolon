const turnManager = {
	turn : 0
};

turnManager.advance = function(){
	turnManager.turn++;
}

turnManager.init = function(){
	turnManager.turn = 0;
}

turnManager.reset = function(){
	turnManager.turn = 0;
}

export default turnManager;

