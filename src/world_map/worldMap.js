import GLOBALS		from '../globals/globals.js';
import INPUT		from '../globals/input.js';
import WorldGenerator	from './worldGenerator.js';
import WorldMapDrawer	from './worldMapDrawer.js';
import MapTile		from './mapTile.js';
import ScreenStack	from '../screens/screenStack.js';
import TopMenu		from '../game_menu/topMenu.js';
import LowerMenu	from '../game_menu/lowerMenu.js';
import RightMenu	from '../game_menu/rightMenu.js';
import MiniMap		from '../game_menu/miniMap.js';

function WorldMap(options, parent){
	this.options		= options;
	this.parent		= parent;
	// Init the stats object
	this.stats = [];
	for (var tileType in MapTile.prototype.tileTypes) {
		this.stats[tileType] = 0;
	}

	WorldGenerator.generate(this);

	this.tileClicked	= null;
	this.nextState		= null;
	this.typeOfView		= 0; //0: Normal, 1: Height, 2: Humidity, 3: Blocks

	//RigthMenu.init();
	RightMenu.init();
}

WorldMap.prototype.draw = function(){
	var context = GLOBALS.context;
	context.fillStyle = GLOBALS.backgroundColor;
	context.fillRect(0, 0, GLOBALS.width, GLOBALS.height);

	WorldMapDrawer.drawArray[this.typeOfView](this);

	LowerMenu.draw(this.getTileClicked());
	TopMenu.draw(this);
	RightMenu.draw();
	MiniMap.draw(this);
}

WorldMap.prototype.update = function(timeElapsed) {
	if (INPUT.keyboard.ARROW_LEFT.execute())	this.moveLeft();
	if (INPUT.keyboard.ARROW_RIGHT.execute())	this.moveRight();
	if (INPUT.keyboard.ARROW_UP.execute())		this.moveUp();
	if (INPUT.keyboard.ARROW_DOWN.execute())	this.moveDown();

	if (INPUT.keyboard.V.execute())			this.changeView();
	if (INPUT.keyboard.C.execute())			this.centerViewonStartingPoint();
	//Mouse
	if (INPUT.mouse.clicked){
		if (INPUT.mouse.x < GLOBALS.mainScreenWidth){
			if (INPUT.mouse.y > GLOBALS.topMenuHeight && INPUT.mouse.y < GLOBALS.bottomOfMap()){
				this.mouseClick(INPUT.mouse.x, INPUT.mouse.y - GLOBALS.topMenuHeight);
			}
		} else {
			if (INPUT.mouse.y >= GLOBALS.bottomOfMap()){
				MiniMap.mouseClick(this, INPUT.mouse.x - GLOBALS.mainScreenWidth, INPUT.mouse.y - GLOBALS.bottomOfMap());
			} else {
				RightMenu.mouseClick();
			}
		}
	}
}

WorldMap.prototype.mouseClick	= function(x,y){
	//Calculate tile clicked
	var tileX			= (~~(x/GLOBALS.tileSize) + this.topLeftX) % this.options.width;
	var tileY			= (~~(y/GLOBALS.tileSize) + this.topLeftY) % this.options.height;

	this.tileClicked = {x:tileX,y:tileY};
	this.nextState = this.getTileClicked().state;
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
