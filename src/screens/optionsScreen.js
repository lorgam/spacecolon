import GLOBALS		from '../globals/globals.js';
import BaseMenu		from '../neuron/baseMenu.js';

function OptionsScreen(){
	BaseMenu.call(this);
	this.section		= "optionsMenu";

	this.addSelection("tileSize", [{"value":GLOBALS.minTileSize(),"text":"little"},{"value":GLOBALS.mediumTileSize(),"text":"medium"},{"value":GLOBALS.maxTileSize(),"text":"big"}], "tileSize");
	this.addLanguageSelection();
}

OptionsScreen.prototype = Object.create(BaseMenu.prototype);

export default OptionsScreen;
