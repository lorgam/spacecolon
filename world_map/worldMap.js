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

WorldMap.prototype.draw = function(){
	var context = GLOBALS.context;

	var horizontalTilesToShow	= GLOBALS.horizontalTilesToShow();
	var verticalTilesToShow		= GLOBALS.verticalTilesToShow();

	var w, h, mapTile, x, y;
	for (w = 0; w < horizontalTilesToShow; w++){
		x = w * GLOBALS.tileSize;

		for (h = 0; h < verticalTilesToShow; h++){
			y = h * GLOBALS.tileSize + GLOBALS.topMenuHeight;
			mapTile = this.map[(this.topLeftX + w) % this.width][(this.topLeftY + h) % this.height];

			if (this.typeOfView == 0){
				context.drawImage(mapTile.texture(), x, y, GLOBALS.tileSize, GLOBALS.tileSize);
			}
			else {
				switch (this.typeOfView){
					case 1	: context.fillStyle = mapTile.heightGray();		break;
					case 2	: context.fillStyle = mapTile.humidityGray();	break;
					default	: context.fillStyle = mapTile.color();
				}
				context.fillRect(x, y, GLOBALS.tileSize, GLOBALS.tileSize);
			}
		}
	}
}

WorldMap.prototype.mouseClick	= function(x,y){
	//Calculate tile clicked
	var tileX			= (~~(x/GLOBALS.tileSize) + this.topLeftX) % this.width;
	var tileY			= (~~(y/GLOBALS.tileSize) + this.topLeftY) % this.height;

	if (this.tileClicked && this.tileClicked.x == tileX && this.tileClicked.y == tileY) this.tileClicked = null;
	else this.tileClicked = {x:tileX,y:tileY};
}

WorldMap.prototype.moveLeft		= function(){this.topLeftX = (this.width + this.topLeftX - 1) % this.width;}
WorldMap.prototype.moveRight	= function(){this.topLeftX = (this.topLeftX + 1) % this.width;}
WorldMap.prototype.moveUp		= function(){if (this.topLeftY > 0) this.topLeftY = this.topLeftY - 1;}
WorldMap.prototype.moveDown		= function(){if (this.topLeftY + GLOBALS.verticalTilesToShow() < this.height) this.topLeftY = this.topLeftY + 1;}
WorldMap.prototype.changeView	= function(){this.typeOfView = (this.typeOfView + 1) % 4;}

WorldMap.prototype.getTileClicked = function(){
	if (this.tileClicked) return this.map[this.tileClicked.x][this.tileClicked.y];
	return null;
}

export default WorldMap;