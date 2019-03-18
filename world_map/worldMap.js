import GLOBALS		from '../globals.js';
import PerlinNoise	from '../neuron/perlinNoise.js';


function WorldMap(width, height){
	this.width			= width;
	this.height			= height;
	this.tileClicked	= null;
	//Tile in the top-left corner of the userview
	this.topLeftX		= 0;
	this.topLeftY		= 0;
	//Noise function for the map height
	var perlinNoise		= new PerlinNoise();
	var size			= 20; //10 seems correct for humidity
	var seed			= Math.random();
	//Generate map
	this.map			= new Array(this.width);

	for (var w = 0; w < this.width; w++){
		this.map[w] = new Array(this.height);

		for (var h = 0; h < this.height; h++){
			var tileHeight = perlinNoise.noise(size*w / this.width, size*h / this.height, seed);
			this.map[w][h] = new MapTile(0.5+(tileHeight/2));
		}
	}
}

WorldMap.prototype.draw = function(context){
	var horizontalTilesToShow	= GLOBALS.mainScreenWidth  / GLOBALS.tileSize;
	var verticalTilesToShow		= GLOBALS.mainScreenHeight / GLOBALS.tileSize;

	var w, h, mapTile;
	for (w = 0; w < horizontalTilesToShow; w++){
		for (h = 0; h < verticalTilesToShow; h++){
			mapTile = this.map[(this.topLeftX + w) % this.width][(this.topLeftY + h) % this.height];

			context.fillStyle	= mapTile.color;
			context.fillRect(w * GLOBALS.tileSize, h * GLOBALS.tileSize, GLOBALS.tileSize, GLOBALS.tileSize);
		}
	}
}

WorldMap.prototype.mouseClick	= function(x,y){
	//Calculate tile clicked
	var tileX			= (~~(x/GLOBALS.tileSize) + this.topLeftX) % this.width;
	var tileY			= (~~(y/GLOBALS.tileSize) + this.topLeftY) % this.height;
	this.tileClicked	= {x:tileX,y:tileY};
	console.log(this.map[this.tileClicked.x][this.tileClicked.y].height);
}

WorldMap.prototype.moveLeft		= function(){this.topLeftX = (this.width + this.topLeftX - 1) % this.width;}
WorldMap.prototype.moveRight	= function(){this.topLeftX = (this.topLeftX + 1) % this.width;}
WorldMap.prototype.moveUp		= function(){this.topLeftY = (this.height + this.topLeftY - 1) % this.height;}
WorldMap.prototype.moveDown		= function(){this.topLeftY = (this.topLeftY + 1) % this.height;}

export default WorldMap;

function MapTile(height){
	this.height = height;
	if (this.height > 0.8) this.color = "#FF0000"
	else if (this.height > 0.7) this.color = "#FFFF00"
	else if (this.height > 0.45) this.color = "#00FF00"
	else this.color	= "#0000FF"
}