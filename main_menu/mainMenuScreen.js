import GLOBALS from '../globals.js';
import INPUT from '../input.js';

function MainMenuScreen(){
	this.totalTime = 0.0;

	this.update = function(timeElapsed){
		this.totalTime += timeElapsed;
	}
	this.draw = function(){
		
	}
}

export default MainMenuScreen;