import GLOBALS			from '../globals.js';
import INPUT			from '../input.js';
import BaseMenu			from './baseMenu.js';
import OptionsScreen	from './optionsScreen.js';
import GameScreen		from './gameScreen.js';

function MainMenuScreen(){
	BaseMenu.call(this);
	this.section		= "mainMenu";

	this.addButton("start", function(){GLOBALS.screenStack.unshift(new GameScreen());});
	this.addButton("options", function(){GLOBALS.screenStack.unshift(new OptionsScreen());});
}

MainMenuScreen.prototype = Object.create(BaseMenu.prototype);

export default MainMenuScreen;