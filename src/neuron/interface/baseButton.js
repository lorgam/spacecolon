import GLOBALS		from '../../globals/globals.js';
import INPUT		from '../../globals/input.js';
import texts		from '../../globals/texts.js';

function BaseButton(parent, x, y, w, h, backColor, section, text, textColor, click){
	this.parent = parent;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.backColor = backColor;
	this.section = section;
	this.text = text;
	this.textColor = textColor;
	this.click = click;
}

BaseButton.prototype.draw = function(){
	var context = GLOBALS.context;
	context.fillStyle	= this.backColor; 
	context.fillRect(this.x, this.y, this.w, this.h);

	context.fillStyle	= this.textColor;
	context.font		= GLOBALS.buttonFont;

	var text = this.getText();
	var textHeight = GLOBALS.fontHeight();

	var marginW = ~~((this.w - context.measureText(text).width) / 2);
	var marginH = ~~((this.h - textHeight) / 2) + textHeight;

	context.fillText(text, this.x + marginW, this.y + marginH);
}

BaseButton.prototype.isClicked = function(){
		if (INPUT.mouse.x > this.x && INPUT.mouse.y > this.y && INPUT.mouse.x < this.x + this.w && INPUT.mouse.y < this.y + this.h) this.click();
}

BaseButton.prototype.click = function(){}
BaseButton.prototype.getText = function(){return texts.getText(this.section, this.text);}

export default BaseButton;
