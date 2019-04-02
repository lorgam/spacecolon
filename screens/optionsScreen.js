import GLOBALS		from '../globals.js';
import INPUT		from '../input.js';
import BaseMenu		from './baseMenu.js';

function OptionsScreen(){
	BaseMenu.call(this);
	this.section		= "optionsMenu";

	this.addSelection("tileSize", [{"value":8,"text":"little"},{"value":16,"text":"medium"},{"value":32,"text":"big"}], "tileSize");
}

OptionsScreen.prototype = Object.create(BaseMenu.prototype);

export default OptionsScreen;