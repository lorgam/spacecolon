import GLOBALS		from '../globals/globals.js';
import INPUT		from '../globals/input.js';
import WorldGenerator	from './worldGenerator.js';
import WorldMapDrawer	from './worldMapDrawer.js';
import ScreenStack	from '../screens/screenStack.js';
import LowerMenu	from '../game_menu/lowerMenu.js';
import RightMenu	from '../game_menu/rightMenu.js';
import MiniMap		from '../game_menu/miniMap.js';

function WorldMap(options){//Width must be a multiple of 4
	this.options		= options;
	WorldGenerator.generate(this);
	this.tileClicked	= null;
	this.typeOfView		= 0; //0: Normal, 1: Height, 2: Humidity, 3: Blocks
}

WorldMap.prototype.draw = function(){
	var context = GLOBALS.context;
	context.fillStyle = GLOBALS.backgroundColor;
	context.fillRect(0, 0, GLOBALS.width, GLOBALS.height);

	WorldMapDrawer.drawArray[this.typeOfView](this);

	LowerMenu.draw(this.getTileClicked());
	RightMenu.draw();
	MiniMap.draw(this);
}

WorldMap.prototype.update = function(timeElapsed) {
	//Keyboard
	if (INPUT.keyboard.ESC.execute()) {
		ScreenStack.removeScreen();
	}
	if (INPUT.keyboard.ARROW_LEFT.execute())	this.moveLeft();
	if (INPUT.keyboard.ARROW_RIGHT.execute())	this.moveRight();
	if (INPUT.keyboard.ARROW_UP.execute())		this.moveUp();
	if (INPUT.keyboard.ARROW_DOWN.execute())	this.moveDown();

	if (INPUT.keyboard.V.execute())				this.changeView();
	//Mouse
	if (INPUT.isClicked()){
		if (INPUT.mouse.x < GLOBALS.mainScreenWidth){
			if (INPUT.mouse.y > GLOBALS.topMenuHeight && INPUT.mouse.y < GLOBALS.bottomOfMap()){
				this.mouseClick(INPUT.mouse.x, INPUT.mouse.y - GLOBALS.topMenuHeight);
			}
		}
		else if (INPUT.mouse.y >= GLOBALS.bottomOfMap()){
			MiniMap.mouseClick(this, INPUT.mouse.x - GLOBALS.mainScreenWidth, INPUT.mouse.y - GLOBALS.bottomOfMap());
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

WorldMap.prototype.centerViewonStartingPoint = function(x,y) {this.centerView(this.startingPointX, this.startingPointY);}

export default WorldMap;
