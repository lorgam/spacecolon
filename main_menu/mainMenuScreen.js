import GLOBALS	from '../globals.js';
import INPUT	from '../input.js';

function MainMenuScreen(context){
	this.totalTime		= 0.0;
	this.selectedOption	= 0;
	this.optionArray	= ["Start", "Options", "Exit"];
	this.context		= context;
	this.padding		= 2;

	this.update = function(timeElapsed){
		this.totalTime += timeElapsed;

		if (INPUT.keyboard.ARROW_UP.execute(timeElapsed)) {
			console.log("UP");
			this.selectedOption = (this.selectedOption + this.optionArray.length - 1) % this.optionArray.length;
		}
		if (INPUT.keyboard.ARROW_DOWN.execute(timeElapsed)) {
			console.log("DOWN");
			this.selectedOption = (this.selectedOption + 1) % this.optionArray.length;
		}
	}

	this.draw = function(){
		var normalColor = "#FFFFFF";
		var highlightColor = "#FF0000";

		this.context.fillStyle	= "#000000";
		this.context.fillRect(0, 0, GLOBALS.width, GLOBALS.height);

		this.context.fillStyle	= normalColor;
		this.context.font		= "30px Arial";

		var fontHeight			= parseInt(this.context.font.match(/\d+/));
		var totalHeight			= (fontHeight + (2*this.padding)) * this.optionArray.length;

		var text, width, top	= ((GLOBALS.height - totalHeight) / 2.0) + this.padding + fontHeight;
		for (var i in this.optionArray){
			text	= this.optionArray[i];
			width	= this.context.measureText(text).width;

			if (this.selectedOption == i){
				this.context.fillStyle	= highlightColor;
				this.context.fillText(text, (GLOBALS.width - width) / 2, top);
				this.context.fillStyle	= normalColor;
			}

			else this.context.fillText(text, (GLOBALS.width - width) / 2, top);

			top += (2 * this.padding) + fontHeight;
		}
	}
}

export default MainMenuScreen;