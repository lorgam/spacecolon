import GLOBALS	from './globals.js';
import INPUT	from './input.js';
import WorldMap	from './world_map/worldMap.js';

function GameScreen(context){
	this.totalTime				= 0.0;
	this.context				= context;
	this.map					= new WorldMap(200,160);

	INPUT.isClicked(); //Clean clicks
	this.update = function(timeElapsed){
		this.totalTime += timeElapsed;
		//Keyboard
		if (INPUT.keyboard.ESC.execute(timeElapsed)) {
			GLOBALS.screenStack.shift();
		}
		if (INPUT.keyboard.ARROW_LEFT.execute(timeElapsed))		this.map.moveLeft();
		if (INPUT.keyboard.ARROW_RIGHT.execute(timeElapsed))	this.map.moveRight();
		if (INPUT.keyboard.ARROW_UP.execute(timeElapsed))		this.map.moveUp();
		if (INPUT.keyboard.ARROW_DOWN.execute(timeElapsed))		this.map.moveDown();
		//Mouse
		if (INPUT.isClicked()){
			if (INPUT.mouse.x < GLOBALS.mainScreenWidth){
				if (INPUT.mouse.y < GLOBALS.mainScreenHeight){
					this.map.mouseClick(INPUT.mouse.x, INPUT.mouse.y);
				}
			}
			
		}
	}

	this.draw = function(){
		this.context.fillStyle = GLOBALS.backgroundColor;
		this.context.fillRect(0, 0, GLOBALS.width, GLOBALS.height);

		this.map.draw(this.context);
	}
}

export default GameScreen;