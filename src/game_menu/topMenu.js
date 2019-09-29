import GLOBALS		from '../globals/globals.js';
import UserResources	from '../resources/userResources.js';

const TopMenu = {
	draw: function(){
		var ctx = GLOBALS.context;
		// robots
		ctx.drawImage(UserResources.textures['robots'], 5, 5, 15, 15);
		
		ctx.fillStyle	= GLOBALS.textColor;
		ctx.font	= GLOBALS.normalFont;
		var fontHeight	= GLOBALS.fontHeight();

		ctx.fillText(UserResources.robots, 20, 17);
	}
}



export default TopMenu;
