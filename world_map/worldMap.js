import GLOBALS			from '../globals.js';
import WorldGenerator	from './worldGenerator.js';

function WorldMap(width, height){//Width must be a multiple of 4
	this.width			= width;
	this.height			= height;
	this.waterHeight	= 0.35 + Math.random() * 0.3;

	this.tileClicked	= null;
	//Tile in the top-left corner of the userview
	this.topLeftX		= 0;
	this.topLeftY		= 0;
	//
	this.typeOfView		= 0; //0: Normal, 1: Height, 2: Humidity

	this.map			= WorldGenerator.generate(this);


}

WorldMap.prototype.draw = function(context){
	var horizontalTilesToShow	= GLOBALS.horizontalTilesToShow();
	var verticalTilesToShow		= GLOBALS.verticalTilesToShow();

	var w, h, mapTile;
	for (w = 0; w < horizontalTilesToShow; w++){
		for (h = 0; h < verticalTilesToShow; h++){
			mapTile = this.map[(this.topLeftX + w) % this.width][(this.topLeftY + h) % this.height];

			switch (this.typeOfView){
				case 1	: context.fillStyle = mapTile.heightGray();		break;
				case 2	: context.fillStyle = mapTile.humidityGray();	break;
				default	: context.fillStyle = mapTile.color();
			}

			context.fillRect(w * GLOBALS.tileSize, h * GLOBALS.tileSize, GLOBALS.tileSize, GLOBALS.tileSize);
		}
	}
}

WorldMap.prototype.mouseClick	= function(x,y){
	//Calculate tile clicked
	var tileX			= (~~(x/GLOBALS.tileSize) + this.topLeftX) % this.width;
	var tileY			= (~~(y/GLOBALS.tileSize) + this.topLeftY) % this.height;
	this.tileClicked	= {x:tileX,y:tileY};
	console.log(this.map[this.tileClicked.x][this.tileClicked.y]);
}

WorldMap.prototype.moveLeft		= function(){this.topLeftX = (this.width + this.topLeftX - 1) % this.width;}
WorldMap.prototype.moveRight	= function(){this.topLeftX = (this.topLeftX + 1) % this.width;}
WorldMap.prototype.moveUp		= function(){if (this.topLeftY > 0) this.topLeftY = this.topLeftY - 1;}
WorldMap.prototype.moveDown		= function(){if (this.topLeftY + GLOBALS.verticalTilesToShow() < this.height) this.topLeftY = this.topLeftY + 1;}
WorldMap.prototype.changeView	= function(){this.typeOfView = (this.typeOfView + 1) % 3;}

export default WorldMap;