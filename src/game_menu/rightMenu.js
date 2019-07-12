import GLOBALS	from '../globals/globals.js';

const RightMenu = {
	draw : function(worldMap){
		var context = GLOBALS.context;
		context.fillStyle = GLOBALS.backgroundColor;
		context.fillRect(GLOBALS.mainScreenWidth, 0, GLOBALS.width, GLOBALS.height);
	}
}

export default RightMenu;