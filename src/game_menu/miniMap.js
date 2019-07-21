import GLOBALS	from '../globals/globals.js';
import aux		from '../globals/auxiliar.js';

const MiniMap = {}

MiniMap.draw = function(worldMap){
	var context = GLOBALS.context;

	context.drawImage(worldMap.mapCanvas, GLOBALS.mainScreenWidth, GLOBALS.bottomOfMap(), GLOBALS.width - GLOBALS.mainScreenWidth, GLOBALS.height - GLOBALS.bottomOfMap());

	//Draw the box that shows how much map are we seeing
	var proportions = {width : GLOBALS.rightMenuSize() / worldMap.options.width, height : GLOBALS.lowerMenuSize() / worldMap.options.height};
	var TopLeftX	= GLOBALS.mainScreenWidth	+ worldMap.topLeftX * proportions.width;
	var TopLeftY	= GLOBALS.bottomOfMap()		+ worldMap.topLeftY * proportions.height;
	var width		= GLOBALS.horizontalTilesToShow() * proportions.width;
	var height		= GLOBALS.verticalTilesToShow()   * proportions.height;

	var alpha		= Math.lerp(0.7,1,aux.gradient);
	context.strokeStyle = 'rgba(0,0,0,'+alpha+')';
	context.strokeRect(TopLeftX, TopLeftY, width, height);

	var diff		= TopLeftX + width - GLOBALS.width;
	if (diff > 0) {
		context.strokeRect(GLOBALS.mainScreenWidth, TopLeftY, diff, height);
	}
}
MiniMap.mouseClick = function(worldMap, x,y){
	worldMap.centerView(~~((x / GLOBALS.rightMenuSize()) * worldMap.options.width), ~~((y / GLOBALS.lowerMenuSize()) * worldMap.options.height));
}

export default MiniMap;
