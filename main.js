import GLOBALS from './globals.js';
import MainMenuScreen from './main_menu/mainMenuScreen.js';

window.onload = function(){
	//Initialize
	GLOBALS.hasToExit = false;
	GLOBALS.screenStack.unshift(new MainMenuScreen());

	var elapsedTime, currentTime, previousTime = Date.now();

	while (!GLOBALS.hasToExit && GLOBALS.screenStack.length > 0){
		currentTime = Date.now();
		elapsedTime = currentTime - previousTime;
		if (elapsedTime < 16.0) continue; //Dont kill the browser
		previousTime = currentTime;

		GLOBALS.screenStack[0].draw();
		//ReadInput
		GLOBALS.screenStack[0].update(elapsedTime);
	}
	console.log("hasToExit: " + GLOBALS.hasToExit);
	console.log("GLOBALS.screenStack[0].totalTime: " + GLOBALS.screenStack[0].totalTime);
};