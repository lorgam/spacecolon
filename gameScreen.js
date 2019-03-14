import GLOBALS	from './globals.js';
import INPUT	from './input.js';

function GameScreen(context){
	this.totalTime		= 0.0;
	this.selectedOption	= 0;
	this.optionArray	= ["Start", "Options", "Exit"];
	this.context		= context;
	this.padding		= 2;

	this.update = function(timeElapsed){
		this.totalTime += timeElapsed;

		if (INPUT.keyboard.ESC.execute(timeElapsed)) {
			GLOBALS.screenStack.shift();
		}

	}

	this.draw = function(){
		this.context.fillStyle	= "#00FFFF";
		this.context.fillRect(0, 0, GLOBALS.width, GLOBALS.height);
	}
}

export default GameScreen;