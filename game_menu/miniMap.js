import GLOBALS	from '../globals.js';

const MiniMap = {
	draw : function(canvas){
		GLOBALS.context.drawImage(canvas, GLOBALS.mainScreenWidth, GLOBALS.bottomOfMap(), GLOBALS.width - GLOBALS.mainScreenWidth, GLOBALS.height - GLOBALS.bottomOfMap());
	}
}

export default MiniMap;