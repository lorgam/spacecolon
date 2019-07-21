import BaseMenu		from '../neuron/baseMenu.js';

function OptionsScreen(){
	BaseMenu.call(this);
	this.section		= "optionsMenu";

	this.addSelection("tileSize", [{"value":16,"text":"little"},{"value":32,"text":"medium"},{"value":64,"text":"big"}], "tileSize");
	this.addLanguageSelection();
}

OptionsScreen.prototype = Object.create(BaseMenu.prototype);

export default OptionsScreen;
