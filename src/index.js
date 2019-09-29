import GLOBALS		from './globals/globals.js';
import INPUT		from './globals/input.js';
import aux		from './globals/auxiliar.js';
import textureManager 	from './neuron/textureManager.js';
import ScreenStack	from './screens/screenStack.js';
import MainMenuScreen	from './screens/mainMenuScreen.js';

var lastRender = 0;

window.onload = function(){
	//Initialize
	GLOBALS.hasToExit = false;
	aux.readUserLanguage();
	textureManager.load();

	var canvas	= document.getElementById('main_canvas');
	GLOBALS.context = canvas.getContext('2d');

	INPUT.init();
	document.onkeydown	=				function(e){INPUT.keyDown(e.keyCode);}
	canvas.addEventListener('click',
										function(e){INPUT.mouseClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);},
							false);

	ScreenStack.addScreen(new MainMenuScreen());
	//Start the loop
	window.requestAnimationFrame(loop);
}

function loop(timestamp){
	var elapsedTime = timestamp - lastRender;
	lastRender = timestamp;

	aux.updateGradient(timestamp);
	ScreenStack.draw();
	ScreenStack.update(elapsedTime);
	INPUT.mouse.clicked = false; //Reset the mouse

	if (!GLOBALS.hasToExit && ScreenStack.screenExists()) window.requestAnimationFrame(loop);
	else console.log("Game over");
}
