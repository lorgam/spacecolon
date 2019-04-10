import BaseMenu		from '../neuron/baseMenu.js';

function OptionsScreen(){
	BaseMenu.call(this);
	this.section		= "optionsMenu";

	this.addSelection("tileSize", [{"value":8,"text":"little"},{"value":16,"text":"medium"},{"value":32,"text":"big"}], "tileSize");
	this.addLanguageSelection();
}

OptionsScreen.prototype = Object.create(BaseMenu.prototype);

export default OptionsScreen;