import GLOBALS	from '../globals.js';

function WorldMap(width, height){
	this.width		= width;
	this.height		= height;
	//Tile in the top-left corner of the userview
	this.topLeftX	= 0;
	this.topLeftY	= 0;
	//Generate map
	this.map		= new Array(this.width);

	for (var w = 0; w < this.width; w++){
		this.map[w] = new Array(this.height);

		for (var h = 0; h < this.height; h++){
			this.map[w][h] = new MapTile(w+h);
		}
	}
}

WorldMap.prototype.draw = function(context){
	var horizontalTilesToShow	= GLOBALS.mainScreenWidth  / tileSize;
	var verticalTilesToShow		= GLOBALS.mainScreenHeight / tileSize;

	var w, h, mapTile;
	for (w = 0; w < horizontalTilesToShow; w++){
		for (h = 0; h < verticalTilesToShow; h++){
			mapTile = this.map[(this.topLeftX + w) % this.width][(this.topLeftY + h) % this.height];

			context.fillStyle	= colors[mapTile.color];
			context.fillRect(w * tileSize, h * tileSize, tileSize, tileSize);
		}
	}
}

WorldMap.prototype.mouseClick	= function(x,y){
	console.log(x);
	console.log(y);
}

WorldMap.prototype.moveLeft		= function(){this.topLeftX = (this.width + this.topLeftX - 1) % this.width;}
WorldMap.prototype.moveRight	= function(){this.topLeftX = (this.topLeftX + 1) % this.width;}
WorldMap.prototype.moveUp		= function(){this.topLeftY = (this.height + this.topLeftY - 1) % this.height;}
WorldMap.prototype.moveDown		= function(){this.topLeftY = (this.topLeftY + 1) % this.height;}

export default WorldMap;

var tileSize	= 40;

function MapTile(seed){
	this.color = seed % colors.length;
}
var colors = ["#0000FF","#00FF00","#FF0000","#FF00FF"];