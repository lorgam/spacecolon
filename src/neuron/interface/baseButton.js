import GLOBALS		from '../../globals/globals.js';
import INPUT		from '../../globals/input.js';
import texts		from '../../globals/texts.js';

function BaseButton(parent, control, backColor, section, text, textColor, click){
	this.parent = parent;
	this.control = control;
	this.backColor = backColor;
	this.section = section;
	this.text = text;
	this.textColor = textColor;
	if (click) this.click = click;
}

BaseButton.prototype.draw = function(){
	var context = GLOBALS.context;
	context.fillStyle	= this.backColor;
	context.fillRect(this.control.left, this.control.top, this.control.width, this.control.height);

	context.fillStyle	= this.textColor;
	context.font		= GLOBALS.buttonFont;

	var text = this.getText();
	var textHeight = GLOBALS.fontHeight();

	var marginW = ~~((this.control.width - context.measureText(text).width) / 2);
	var marginH = ~~((this.control.height - textHeight) / 2) + textHeight;

	context.fillText(text, this.control.left + marginW, this.control.top + marginH);
}

BaseButton.prototype.isClicked = function(){
	if (INPUT.mouse.x > this.control.left && INPUT.mouse.y > this.control.top && INPUT.mouse.x < this.control.left + this.control.width && INPUT.mouse.y < this.control.top + this.control.height) this.click();
}

BaseButton.prototype.click = function(){}
BaseButton.prototype.getText = function(){return texts.getText(this.section, this.text);}

export default BaseButton;
