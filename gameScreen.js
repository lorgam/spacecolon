import GLOBALS			from './globals.js';
import INPUT			from './input.js';
import WorldMap			from './world_map/worldMap.js';
import LowerMenu		from './game_menu/lowerMenu.js';
import textureManager	from './texture/textureManager.js';

function GameScreen(){
	this.totalTime				= 0.0;
	this.map					= new WorldMap(400,150);
	this.lowerMenu				= new LowerMenu();

	textureManager.load(); //Load image data
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

		if (INPUT.keyboard.V.execute(timeElapsed))				this.map.changeView();
		//Mouse
		if (INPUT.isClicked()){
			if (INPUT.mouse.x < GLOBALS.mainScreenWidth){
				if (INPUT.mouse.y > GLOBALS.topMenuHeight && INPUT.mouse.y < GLOBALS.bottomOfMap()){
					this.map.mouseClick(INPUT.mouse.x, INPUT.mouse.y - GLOBALS.topMenuHeight);
				}
			}
			
		}
	}

	this.draw = function(){
		var context = GLOBALS.context;
		context.fillStyle = GLOBALS.backgroundColor;
		context.fillRect(0, 0, GLOBALS.width, GLOBALS.height);

		this.map.draw();

		this.lowerMenu.draw(this.map.getTileClicked());
	}
}

export default GameScreen;