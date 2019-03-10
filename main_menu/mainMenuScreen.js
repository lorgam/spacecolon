import GLOBALS	from '../globals.js';
import INPUT	from '../input.js';

function MainMenuScreen(context){
	this.totalTime		= 0.0;
	this.selectedOption	= 0;
	this.optionArray	= ["Start", "Exit"];
	this.context		= context;
	this.padding		= 2;

	this.update = function(timeElapsed){
		this.totalTime += timeElapsed;
	}

	this.draw = function(){
		this.context.fillStyle	= "#000000";
		this.context.fillRect(0, 0, GLOBALS.width, GLOBALS.height);

		this.context.fillStyle	= "#FFFFFF";
		this.context.font		= "30px Arial";

		var fontHeight			= parseInt(this.context.font.match(/\d+/));
		var totalHeight			= (fontHeight + (2*this.padding)) * this.optionArray.length;

		var text, width, top	= ((GLOBALS.height - totalHeight) / 2.0) + this.padding + fontHeight;
		for (var i in this.optionArray){
			text	= this.optionArray[i];
			width	= this.context.measureText(text).width;

			this.context.fillText(text, (GLOBALS.width - width) / 2, top);

			top += (2 * this.padding) + fontHeight;
		}
	}
}

export default MainMenuScreen;