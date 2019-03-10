import GLOBALS from '../globals.js';

function MainMenuScreen(){
	this.totalTime = 0.0;

	this.update = function(timeElapsed){
		this.totalTime += timeElapsed;
		GLOBALS.hasToExit = (this.totalTime > 600);
	}
	this.draw = function(){
		
	}
}

export default MainMenuScreen;