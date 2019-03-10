import { MainMenuScreen } from './main_menu/mainMenuScreen.js';

var hasToExit;
var screenStack = new Array();

window.onload = function(){
	//Initialize
	hasToExit = false;
	screenStack.unshift(new MainMenuScreen());
	var elapsedTime, currentTime, previousTime = Date.now();

	while (!hasToExit && screenStack.length > 0){
		currentTime = Date.now();
		elapsedTime = currentTime - previousTime;
		if (elapsedTime < 10.0) continue; //Dont kill the browser
		previousTime = currentTime;
		//Pick from the top of the stack 
		//Draw
		screenStack[0].draw();
		//ReadInput
		//Update
		screenStack[0].update(elapsedTime);
	}
};