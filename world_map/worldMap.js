import GLOBALS			from '../globals.js';
import WorldGenerator	from './worldGenerator.js';

function WorldMap(options){//Width must be a multiple of 4
	this.options		= options;
	WorldGenerator.generateWorld(this);

	this.tileClicked	= null;
	//Tile in the top-left corner of the userview
	this.topLeftX		= 0;
	this.topLeftY		= 0;
	//
	this.typeOfView		= 0; //0: Normal, 1: Height, 2: Humidity
}

WorldMap.prototype.draw = function(){
	var context = GLOBALS.context;

	var horizontalTilesToShow	= GLOBALS.horizontalTilesToShow();
	var verticalTilesToShow		= GLOBALS.verticalTilesToShow();

	if (this.typeOfView == 0){
		context.drawImage(	this.mapCanvas,
							this.topLeftX * GLOBALS.maxTileSize, this.topLeftY * GLOBALS.maxTileSize, horizontalTilesToShow * GLOBALS.maxTileSize, verticalTilesToShow * GLOBALS.maxTileSize,
							0, GLOBALS.topMenuHeight, GLOBALS.mainScreenWidth, GLOBALS.mainScreenHeight
						);

		var horizontalTilesDrawn = this.options.width - this.topLeftX;
		if (horizontalTilesDrawn < horizontalTilesToShow){
			context.drawImage(	this.mapCanvas,
								0, this.topLeftY * GLOBALS.maxTileSize, horizontalTilesToShow * GLOBALS.maxTileSize, verticalTilesToShow * GLOBALS.maxTileSize,
								horizontalTilesDrawn * GLOBALS.tileSize, GLOBALS.topMenuHeight, GLOBALS.mainScreenWidth, GLOBALS.mainScreenHeight
							);
			horizontalTilesDrawn +=  this.map.width;
		}

		return;
	}

	var w, h, mapTile, x, y;
	for (w = 0; w < horizontalTilesToShow; w++){
		x = w * GLOBALS.tileSize;

		for (h = 0; h < verticalTilesToShow; h++){
			y = h * GLOBALS.tileSize + GLOBALS.topMenuHeight;
			mapTile = this.map[(this.topLeftX + w) % this.options.width][(this.topLeftY + h) % this.options.height];

			switch (this.typeOfView){
				case 1	: context.fillStyle = mapTile.heightGray();		break;
				case 2	: context.fillStyle = mapTile.humidityGray();	break;
				default	: context.fillStyle = mapTile.mapColor();
			}
			context.fillRect(x, y, GLOBALS.tileSize, GLOBALS.tileSize);
		}
	}
}

WorldMap.prototype.mouseClick	= function(x,y){
	//Calculate tile clicked
	var tileX			= (~~(x/GLOBALS.tileSize) + this.topLeftX) % this.options.width;
	var tileY			= (~~(y/GLOBALS.tileSize) + this.topLeftY) % this.options.height;

	if (this.tileClicked && this.tileClicked.x == tileX && this.tileClicked.y == tileY) this.tileClicked = null;
	else this.tileClicked = {x:tileX,y:tileY};
}

WorldMap.prototype.moveLeft		= function(){this.topLeftX = (this.options.width + this.topLeftX - 1) % this.options.width;}
WorldMap.prototype.moveRight	= function(){this.topLeftX = (this.topLeftX + 1) % this.options.width;}
WorldMap.prototype.moveUp		= function(){if (this.topLeftY > 0) this.topLeftY = this.topLeftY - 1;}
WorldMap.prototype.moveDown		= function(){if (this.topLeftY + GLOBALS.verticalTilesToShow() < this.options.height) this.topLeftY = this.topLeftY + 1;}
WorldMap.prototype.changeView	= function(){this.typeOfView = (this.typeOfView + 1) % 4;}

WorldMap.prototype.getTileClicked = function(){
	if (this.tileClicked) return this.map[this.tileClicked.x][this.tileClicked.y];
	return null;
}

export default WorldMap;