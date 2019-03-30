import GLOBALS		from '../globals.js';
import INPUT		from '../input.js';
import GameScreen	from './gameScreen.js';

function MainMenuScreen(){
	this.totalTime		= 0.0;
	this.selectedOption	= 0;
	this.optionArray	= ["Start", "Options", "Exit"];
	this.padding		= 2;

	this.update = function(timeElapsed){
		this.totalTime += timeElapsed;

		if (INPUT.keyboard.ARROW_UP.execute(timeElapsed)) {
			this.selectedOption = (this.selectedOption + this.optionArray.length - 1) % this.optionArray.length;
		}
		if (INPUT.keyboard.ARROW_DOWN.execute(timeElapsed)) {
			this.selectedOption = (this.selectedOption + 1) % this.optionArray.length;
		}
		if (INPUT.keyboard.ENTER.execute(timeElapsed)) {
			if (this.selectedOption == 0) GLOBALS.screenStack.unshift(new GameScreen());
		}
	}

	this.draw = function(){
		var context = GLOBALS.context;
		context.fillStyle	= GLOBALS.backgroundColor;
		context.fillRect(0, 0, GLOBALS.width, GLOBALS.height);

		context.fillStyle	= GLOBALS.textColor;
		context.font		= GLOBALS.menuFont;

		var fontHeight			= GLOBALS.fontHeight();
		var totalHeight			= (fontHeight + (2*this.padding)) * this.optionArray.length;

		var text, width, top	= ((GLOBALS.height - totalHeight) / 2.0) + this.padding + fontHeight;
		for (var i in this.optionArray){
			text	= this.optionArray[i];
			width	= context.measureText(text).width;

			if (this.selectedOption == i){
				var sin	= (1 + Math.sin(this.totalTime * 0.003)) * 0.5;
				var r	= 255;
				var g	= Math.lerp(0, 128, sin);
				var b	= g;

				context.fillStyle	= 'rgb('+r+','+g+','+b+')';
				context.fillText(text, (GLOBALS.width - width) / 2, top);
				context.fillStyle	= GLOBALS.textColor;
			}

			else context.fillText(text, (GLOBALS.width - width) / 2, top);

			top += (2 * this.padding) + fontHeight;
		}
	}
}

export default MainMenuScreen;