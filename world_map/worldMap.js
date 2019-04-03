import WorldGenerator	from './worldGenerator.js';
import WorldMapDrawer	from './worldMapDrawer.js';

function WorldMap(options){//Width must be a multiple of 4
	this.options		= options;
	WorldGenerator.generate(this);

	this.tileClicked	= null;
	//Tile in the top-left corner of the userview
	this.topLeftX		= 0;
	this.topLeftY		= 0;
	//
	this.typeOfView		= 0; //0: Normal, 1: Height, 2: Humidity, 3: Blocks
}

WorldMap.prototype.draw = function(){
	WorldMapDrawer.drawArray[this.typeOfView](this);
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

WorldMap.prototype.changeView	= function(){this.typeOfView = (this.typeOfView + 1) % WorldMapDrawer.drawArray.length;}

WorldMap.prototype.getTileClicked = function(){
	if (this.tileClicked) return this.map[this.tileClicked.x][this.tileClicked.y];
	return null;
}

WorldMap.prototype.centerView = function(x,y) {
	this.topLeftX = (~~(x - GLOBALS.horizontalTilesToShow() / 2) + this.options.width) % this.options.width;
	this.topLeftY = ~~(y - GLOBALS.verticalTilesToShow() / 2);

	if (this.topLeftY < 0){
		this.topLeftY = 0;
		return;
	}
	if (this.topLeftY + GLOBALS.verticalTilesToShow() > this.options.height) this.topLeftY = this.options.height - GLOBALS.verticalTilesToShow();
};

export default WorldMap;