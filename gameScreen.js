import GLOBALS	from './globals.js';
import INPUT	from './input.js';

function GameScreen(context){
	this.totalTime		= 0.0;
	this.context		= context;

	this.map			= new Array(mapOptions.width);
	var w, h;
	for (w = 0; w < mapOptions.width; w++){
		this.map[w] = new Array(mapOptions.height);
		for (h = 0; h < mapOptions.height; h++){
			this.map[w][h] = new MapTile(w+h);
		}
	}
	console.log(this.map);
	this.update = function(timeElapsed){
		this.totalTime += timeElapsed;

		if (INPUT.keyboard.ESC.execute(timeElapsed)) {
			GLOBALS.screenStack.shift();
		}

	}

	this.draw = function(){
		this.context.fillStyle	= "#00FFFF";
		this.context.fillRect(0, 0, GLOBALS.width, GLOBALS.height);
	}
}

export default GameScreen;

var colors = ["0000FF","00FF00","FF0000"];
var mapOptions = {
	width	: 10,
	height	: 10
};

function MapTile(seed){
	this.color = seed % colors.length;
}