import GLOBALS		from '../../globals/globals.js';
import INPUT		from '../../globals/input.js';

function BaseButton(parent, control, backColor, click){
	this.parent = parent;
	this.control = control;
	this.backColor = backColor;
	if (click) this.click = click;

	this.ctx = GLOBALS.context;
}

BaseButton.prototype.draw = function(){
	this.drawBackGround();
}

BaseButton.prototype.drawBackGround = function(){
	this.ctx.fillStyle = this.backColor;
	this.ctx.fillRect(this.control.left, this.control.top, this.control.width, this.control.height);
}

BaseButton.prototype.isClicked = function(){
	if (INPUT.mouse.x > this.control.left && INPUT.mouse.y > this.control.top && INPUT.mouse.x < this.control.left + this.control.width && INPUT.mouse.y < this.control.top + this.control.height) this.click();
}

BaseButton.prototype.click = function(){}

export default BaseButton;

