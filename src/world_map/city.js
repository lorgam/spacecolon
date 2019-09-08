import GLOBALS	from '../globals/globals.js';
import INPUT	from '../globals/input.js';

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
	this.context.fillStyle = "#000088";
	this.context.fillRect(GLOBALS.mainScreenWidth, GLOBALS.bottomOfMap() - 100, GLOBALS.rightMenuSize(), 100);
}

export default City;
