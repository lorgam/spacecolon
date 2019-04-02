import GLOBALS		from '../globals.js';
import INPUT		from '../input.js';
import BaseMenu			from './baseMenu.js';

function OptionsScreen(){
	BaseMenu.call(this);
	this.section		= "optionsMenu";

	this.addButton("language", function(){GLOBALS.screenStack.unshift(new GameScreen());});
}

OptionsScreen.prototype = Object.create(BaseMenu.prototype);

export default OptionsScreen;