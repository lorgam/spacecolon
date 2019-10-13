import GLOBALS		from '../../globals/globals.js';
import INPUT		from '../../globals/input.js';
import collision2d	from '../physics/collision2d.js';

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
	if (collision2d.pointInRectangle(INPUT.mouse, this.control.getRect())) this.click();
}

BaseButton.prototype.click = function(){}

export default BaseButton;

