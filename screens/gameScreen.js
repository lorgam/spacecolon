import GLOBALS			from '../globals.js';
import INPUT			from '../input.js';
import WorldMap			from '../world_map/worldMap.js';
import WorldGenerator	from '../world_map/worldGenerator.js';
import LowerMenu		from '../game_menu/lowerMenu.js';
import RightMenu		from '../game_menu/rightMenu.js';
import MiniMap			from '../game_menu/miniMap.js';
import textureManager	from '../neuron/textureManager.js';

function GameScreen(){
	this.totalTime	= 0.0;
	this.worldMap	= new WorldMap(WorldGenerator.generateOptions(
																	{type : 'normal'}
																));

	textureManager.load(); //Load image data
	INPUT.isClicked(); //Clean clicks
}

GameScreen.prototype.update = function(timeElapsed) {
	this.totalTime += timeElapsed;
	//Keyboard
	if (INPUT.keyboard.ESC.execute()) {
		GLOBALS.screenStack.shift();
	}
	if (INPUT.keyboard.ARROW_LEFT.execute())	this.worldMap.moveLeft();
	if (INPUT.keyboard.ARROW_RIGHT.execute())	this.worldMap.moveRight();
	if (INPUT.keyboard.ARROW_UP.execute())		this.worldMap.moveUp();
	if (INPUT.keyboard.ARROW_DOWN.execute())	this.worldMap.moveDown();

	if (INPUT.keyboard.V.execute())				this.worldMap.changeView();
	//Mouse
	if (INPUT.isClicked()){
		if (INPUT.mouse.x < GLOBALS.mainScreenWidth){
			if (INPUT.mouse.y > GLOBALS.topMenuHeight && INPUT.mouse.y < GLOBALS.bottomOfMap()){
				this.worldMap.mouseClick(INPUT.mouse.x, INPUT.mouse.y - GLOBALS.topMenuHeight);
			}
		}
		else if (INPUT.mouse.y >= GLOBALS.bottomOfMap()){
			MiniMap.mouseClick(this.worldMap, INPUT.mouse.x - GLOBALS.mainScreenWidth, INPUT.mouse.y - GLOBALS.bottomOfMap());
		}
	}
};

GameScreen.prototype.draw = function() {
	var context = GLOBALS.context;
	context.fillStyle = GLOBALS.backgroundColor;
	context.fillRect(0, 0, GLOBALS.width, GLOBALS.height);

	this.worldMap.draw();

	LowerMenu.draw(this.worldMap.getTileClicked());
	RightMenu.draw();
	MiniMap.draw(this.worldMap);
};

export default GameScreen;