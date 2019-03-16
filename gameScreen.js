import GLOBALS	from './globals.js';
import INPUT	from './input.js';
import WorldMap	from './world_map/worldMap.js';

function GameScreen(context){
	this.totalTime				= 0.0;
	this.context				= context;
	this.map					= new WorldMap(20,16);

	this.update = function(timeElapsed){
		this.totalTime += timeElapsed;

		if (INPUT.keyboard.ESC.execute(timeElapsed)) {
			GLOBALS.screenStack.shift();
		}
		if (INPUT.keyboard.ARROW_LEFT.execute(timeElapsed))		this.map.moveLeft();
		if (INPUT.keyboard.ARROW_RIGHT.execute(timeElapsed))	this.map.moveRight();
		if (INPUT.keyboard.ARROW_UP.execute(timeElapsed))		this.map.moveUp();
		if (INPUT.keyboard.ARROW_DOWN.execute(timeElapsed))		this.map.moveDown();

	}

	this.draw = function(){
		this.context.fillStyle	= "#000000";
		this.context.fillRect(0, 0, GLOBALS.width, GLOBALS.height);

		this.map.draw(this.context);
	}
}

export default GameScreen;