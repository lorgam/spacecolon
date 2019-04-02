import GLOBALS		from '../globals.js';
import INPUT		from '../input.js';
import BaseMenu			from './baseMenu.js';

function OptionsScreen(){
	BaseMenu.call(this);
	this.optionArray	= ["language"];
	this.section		= "optionsMenu";
}

OptionsScreen.prototype = Object.create(BaseMenu.prototype);

OptionsScreen.prototype.update = function(timeElapsed){
	if (INPUT.keyboard.ARROW_UP.execute(timeElapsed)) {
		this.selectedOption = (this.selectedOption + this.optionArray.length - 1) % this.optionArray.length;
	}
	if (INPUT.keyboard.ARROW_DOWN.execute(timeElapsed)) {
		this.selectedOption = (this.selectedOption + 1) % this.optionArray.length;
	}
	if (INPUT.keyboard.ENTER.execute(timeElapsed)) {
		//if (this.selectedOption == 0) GLOBALS.screenStack.unshift(new GameScreen());
	}
}

export default OptionsScreen;