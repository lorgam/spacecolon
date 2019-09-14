import GLOBALS	from '../globals/globals.js';
import INPUT	from '../globals/input.js';
import texts	from '../globals/texts.js';

function City(parent){
	this.parent = parent;
	this.context = GLOBALS.context;
	this.nextState = null;
}

City.prototype.text = function() {
	return "city";
}

City.prototype.update = function() {
	if (INPUT.isClicked()){
		if (INPUT.mouse.x > GLOBALS.mainScreenWidth && INPUT.mouse.y < GLOBALS.bottomOfMap() && INPUT.mouse.y > GLOBALS.bottomOfMap() - 100){
			this.nextState = this.parent.parent;
			INPUT.resetKeyboard();
		}
	}
}

City.prototype.draw = function() {
	this.drawBackground();
	this.drawBackButton();
}

City.prototype.drawBackground = function() {
	this.parent.parent.draw();
	this.context.globalAlpha = 0.5;
	this.context.fillStyle = "#000088"; 
	this.context.fillRect(0, GLOBALS.topMenuHeight, GLOBALS.mainScreenWidth, GLOBALS.mainScreenHeight);
	this.context.globalAlpha = 1;
}

City.prototype.drawBackButton = function() {
	var btnHeight = 44;
	this.context.fillStyle = "#000088";
	this.context.fillRect(GLOBALS.mainScreenWidth, GLOBALS.bottomOfMap() - btnHeight, GLOBALS.rightMenuSize(), btnHeight);

	this.context.fillStyle = GLOBALS.highlightColor;
	this.context.font = GLOBALS.buttonFont;
	var text = '< ' + texts.getText('general', 'back');
	var width = ~~((GLOBALS.rightMenuSize() - this.context.measureText(text).width) / 2);
	this.context.fillText(text, GLOBALS.mainScreenWidth + width , GLOBALS.bottomOfMap() - 11);
}

export default City;
