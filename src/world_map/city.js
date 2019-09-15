import GLOBALS		from '../globals/globals.js';
import INPUT		from '../globals/input.js';
import texts		from '../globals/texts.js';
import BaseButton	from '../neuron/interface/baseButton.js';

function City(parent){
	this.parent = parent;
	this.context = GLOBALS.context;
	this.nextState = null;
	this.btnBack = new BaseButton(this, GLOBALS.mainScreenWidth, GLOBALS.bottomOfMap() - 44, GLOBALS.rightMenuSize(), 44, "#000088", "general", "back", GLOBALS.highlightColor, function(){this.parent.nextState = this.parent.parent.parent;});
}

City.prototype.text = function() {
	return "city";
}

City.prototype.update = function() {
	if (INPUT.isClicked()){
		this.btnBack.isClicked();
	}
}

City.prototype.draw = function() {
	this.drawBackground();
	this.btnBack.draw();
}

City.prototype.drawBackground = function() {
	this.parent.parent.draw();
	this.context.globalAlpha = 0.5;
	this.context.fillStyle = "#000088"; 
	this.context.fillRect(0, GLOBALS.topMenuHeight, GLOBALS.mainScreenWidth, GLOBALS.mainScreenHeight);
	this.context.globalAlpha = 1;
}

export default City;
