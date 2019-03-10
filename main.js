import GLOBALS from './globals.js';
import INPUT from './input.js';
import MainMenuScreen from './main_menu/mainMenuScreen.js';

var lastRender = 0;

window.onload = function(){
	//Initialize
	GLOBALS.hasToExit = false;

	var canvas = document.getElementById("main_canvas");
	var ctx = canvas.getContext("2d");
	GLOBALS.screenStack.unshift(new MainMenuScreen(ctx));

	INPUT.init();
	document.onkeydown	= function(e){INPUT.keyDown(e.keyCode);}
	document.onkeyup	= function(e){INPUT.keyUp(e.keyCode);}

	window.requestAnimationFrame(loop);
};

function loop(timestamp){
	var elapsedTime = timestamp - lastRender;
	lastRender = timestamp;

	GLOBALS.screenStack[0].draw();
	GLOBALS.screenStack[0].update(elapsedTime);

	GLOBALS.hasToExit = INPUT.keyboard.ESC.isPressed();

	if (!GLOBALS.hasToExit && GLOBALS.screenStack.length > 0) window.requestAnimationFrame(loop);
	else console.log("Game over");
}