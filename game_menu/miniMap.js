import GLOBALS	from '../globals.js';

const MiniMap = {
	draw : function(worldMap){
		GLOBALS.context.drawImage(worldMap.mapCanvas, GLOBALS.mainScreenWidth, GLOBALS.bottomOfMap(), GLOBALS.width - GLOBALS.mainScreenWidth, GLOBALS.height - GLOBALS.bottomOfMap());
	},
	mouseClick : function(worldMap, x,y){
		worldMap.centerView(~~((x / GLOBALS.rightMenuSize()) * worldMap.options.width), ~~((y / GLOBALS.lowerMenuSize()) * worldMap.options.height));
	}
}

export default MiniMap;