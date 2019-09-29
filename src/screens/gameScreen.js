import GLOBALS		from '../globals/globals.js';
import INPUT		from '../globals/input.js';
import WorldMap		from '../world_map/worldMap.js';
import WorldGenerator	from '../world_map/worldGenerator.js';
import textureManager	from '../neuron/textureManager.js';
import UserResources	from '../resources/userResources';
import OptionsScreen	from './optionsScreen.js';
import ScreenStack	from './screenStack.js';

function GameScreen(){
	this.totalTime		= 0.0;
	UserResources.robots	= 2;

	this.worldMap		= new WorldMap(WorldGenerator.generateOptions({type : 'normal'}), this);

	this.currentState	= this.worldMap;
	this.defaultState	= this.currentState;

	textureManager.load();
}

GameScreen.prototype.update = function(timeElapsed) {
	this.totalTime += timeElapsed;

	if (INPUT.keyboard.O.execute()){ //Otions menu
		ScreenStack.addScreen(new OptionsScreen());
		INPUT.resetKeyboard();
		return;
	}
	if (INPUT.keyboard.ESC.execute()) { //Go back
		if (this.currentState == this.defaultState) ScreenStack.removeScreen();
		else this.currentState.nextState = this.defaultState;
		INPUT.resetKeyboard();
	}
	if (this.currentState.nextState != null){ //Change the state
		var aux = this.currentState.nextState;
		this.currentState.nextState = null;
		this.currentState = aux;
		INPUT.resetKeyboard();
	}
	this.currentState.update(timeElapsed);
}

GameScreen.prototype.draw = function() {this.currentState.draw();}

export default GameScreen;
