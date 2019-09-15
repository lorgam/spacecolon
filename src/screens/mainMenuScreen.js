import GLOBALS		from '../globals/globals.js';
import BaseMenu		from '../neuron/interface/baseMenu.js';
import OptionsScreen	from './optionsScreen.js';
import GameScreen	from './gameScreen.js';
import ScreenStack	from './screenStack.js';

function MainMenuScreen(){
	BaseMenu.call(this);
	this.section		= "mainMenu";

	this.addButton("start", function(){ScreenStack.addScreen(new GameScreen());});
	this.addButton("options", function(){ScreenStack.addScreen(new OptionsScreen());});
}

MainMenuScreen.prototype = Object.create(BaseMenu.prototype);

export default MainMenuScreen;
