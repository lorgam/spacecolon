import WorldMap			from '../world_map/worldMap.js';
import WorldGenerator	from '../world_map/worldGenerator.js';
import textureManager	from '../neuron/textureManager.js';
import OptionsScreen	from './optionsScreen.js';
//@Note: Here should be the state of the game
//The update and draw methods should be mapped to the current state functions
function GameScreen(){
	this.totalTime		= 0.0;
	this.worldMap		= new WorldMap(WorldGenerator.generateOptions(
																	{type : 'normal'}
																));
	this.currentState	= this.worldMap;

	textureManager.load(); //Load image data
	INPUT.isClicked(); //Clean clicks
}

GameScreen.prototype.update = function(timeElapsed) {
	this.totalTime += timeElapsed;

	if (INPUT.keyboard.O.execute()){
		GLOBALS.screenStack.unshift(new OptionsScreen());
		return;
	}
	this.currentState.update(timeElapsed);
}

GameScreen.prototype.draw = function() {this.currentState.draw();}

export default GameScreen;