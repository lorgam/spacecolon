import GLOBALS	from '../globals.js';

const MiniMap = {
	draw : function(worldMap){
		GLOBALS.context.drawImage(worldMap.mapCanvas, GLOBALS.mainScreenWidth, GLOBALS.bottomOfMap(), GLOBALS.width - GLOBALS.mainScreenWidth, GLOBALS.height - GLOBALS.bottomOfMap());
	}
}

export default MiniMap;