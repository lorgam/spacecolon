import GLOBALS			from '../globals.js';

function BaseMenu(){
	this.selectedOption	= 0;
}

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
		text	= texts.getText(this.section, this.optionArray[i]);
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

BaseMenu.prototype.padding = 2;

export default BaseMenu;