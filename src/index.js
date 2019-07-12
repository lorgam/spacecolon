import MainMenuScreen	from './screens/mainMenuScreen.js';

var lastRender = 0;

window.onload = function(){
	//Initialize
	GLOBALS.hasToExit = false;
	aux.readUserLanguage();

	var canvas	= document.getElementById('main_canvas');

	GLOBALS.context = canvas.getContext('2d');
	GLOBALS.screenStack.unshift(new MainMenuScreen());

	INPUT.init();
	document.onkeydown	=				function(e){INPUT.keyDown(e.keyCode);}
	canvas.addEventListener('click',
										function(e){INPUT.mouseClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);},
							false);
	//Start the loop
	window.requestAnimationFrame(loop);
}

function loop(timestamp){
	var elapsedTime = timestamp - lastRender;
	lastRender = timestamp;

	aux.updateGradient(timestamp);
	GLOBALS.screenStack[0].draw();
	GLOBALS.screenStack[0].update(elapsedTime);

	if (!GLOBALS.hasToExit && GLOBALS.screenStack.length > 0) window.requestAnimationFrame(loop);
	else console.log("Game over");
}