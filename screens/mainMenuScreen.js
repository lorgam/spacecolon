import GLOBALS			from '../globals.js';
import INPUT			from '../input.js';
import BaseMenu			from './baseMenu.js';
import OptionsScreen	from './optionsScreen.js';
import GameScreen		from './gameScreen.js';

function MainMenuScreen(){
	BaseMenu.call(this);
	this.optionArray	= ["start", "options"];
	this.section		= "mainMenu";
}

MainMenuScreen.prototype = Object.create(BaseMenu.prototype);

MainMenuScreen.prototype.update = function(timeElapsed){
	if (INPUT.keyboard.ARROW_UP.execute(timeElapsed)) {
		this.selectedOption = (this.selectedOption + this.optionArray.length - 1) % this.optionArray.length;
	}
	if (INPUT.keyboard.ARROW_DOWN.execute(timeElapsed)) {
		this.selectedOption = (this.selectedOption + 1) % this.optionArray.length;
	}
	if (INPUT.keyboard.ENTER.execute(timeElapsed)) {
		if (this.selectedOption == 0) GLOBALS.screenStack.unshift(new GameScreen());
		if (this.selectedOption == 1) GLOBALS.screenStack.unshift(new OptionsScreen());
	}
}

export default MainMenuScreen;