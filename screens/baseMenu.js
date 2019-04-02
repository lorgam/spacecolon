import GLOBALS	from '../globals.js';
import INPUT	from '../input.js';

function BaseMenu(){
	this.selectedOption	= 0;
	this.optionArray	= [];
}

BaseMenu.prototype.update = function(timeElapsed){
	if (INPUT.keyboard.ESC.execute() && GLOBALS.screenStack.length > 1)  GLOBALS.screenStack.shift();
	if (INPUT.keyboard.ENTER.execute()) this.optionArray[this.selectedOption].execute();

	if (INPUT.keyboard.ARROW_UP.execute()) {
		this.selectedOption = (this.selectedOption + this.optionArray.length - 1) % this.optionArray.length;
	}
	if (INPUT.keyboard.ARROW_DOWN.execute()) {
		this.selectedOption = (this.selectedOption + 1) % this.optionArray.length;
	}
}

BaseMenu.prototype.padding = 2;
BaseMenu.prototype.draw = function(){
	var context = GLOBALS.context;
	context.fillStyle	= GLOBALS.backgroundColor;
	context.fillRect(0, 0, GLOBALS.width, GLOBALS.height);

	context.fillStyle	= GLOBALS.textColor;
	context.font		= GLOBALS.menuFont;

	var fontHeight			= GLOBALS.fontHeight();
	var totalHeight			= (fontHeight + (2*this.padding)) * this.optionArray.length;

	var text, width, top	= ((GLOBALS.height - totalHeight) / 2.0) + this.padding + fontHeight;
	for (var i in this.optionArray){
		text	= this.optionArray[i].getText(this.section);
		width	= context.measureText(text).width;

		if (this.selectedOption == i){
			var g	= Math.lerp(0, 128, aux.gradient);

			context.fillStyle	= 'rgb(255,'+g+','+g+')';
			context.fillText(text, (GLOBALS.width - width) / 2, top);
			context.fillStyle	= GLOBALS.textColor;
		}

		else context.fillText(text, (GLOBALS.width - width) / 2, top);

		top += (2 * this.padding) + fontHeight;
	}
}

BaseMenu.prototype.addButton = function(text, function_pointer){
	this.optionArray.push(new MenuOption(text, function_pointer));
}

export default BaseMenu;

function BaseMenuOption(text){
	this.text = text;
}
BaseMenuOption.prototype.getText = function(section){return texts.getText(section, this.text);}
BaseMenuOption.prototype.execute = function(){}

function MenuOption(text, function_pointer){
	BaseMenuOption.call(this, text);
	this.function_pointer = function_pointer;
}
MenuOption.prototype = Object.create(BaseMenuOption.prototype);
MenuOption.prototype.execute = function(){
	this.function_pointer();
}