import BaseButton	from './baseButton.js';
import GLOBALS		from '../../globals/globals.js';
import texts		from '../../globals/texts.js';

function TextButton(parent, control, backColor, section, text, textColor, click){
	BaseButton.call(this, parent, control, backColor, click);
	this.section = section;
	this.text = text;
	this.textColor = textColor;
}

TextButton.prototype = Object.create(BaseButton.prototype);

TextButton.prototype.getText = function(){return texts.getText(this.section, this.text);}

TextButton.prototype.drawText = function(){
	this.ctx.fillStyle	= this.textColor;
	this.ctx.font		= GLOBALS.buttonFont;

	var text = this.getText();
	var textHeight = GLOBALS.fontHeight();

	var marginW = ~~((this.control.width - this.ctx.measureText(text).width) / 2);
	var marginH = ~~((this.control.height - textHeight) / 2) + textHeight;

	this.ctx.fillText(text, this.control.left + marginW, this.control.top + marginH);
}

TextButton.prototype.draw = function(){
	BaseButton.prototype.draw.call(this);
	this.drawText();
}

export default TextButton;

