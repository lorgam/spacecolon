import GLOBALS		from '../globals/globals.js';
import textureManager 	from '../neuron/textureManager.js';
import MenuControl 	from './menuControl.js';

const TopMenu = {
	draw: function(worldMap){
		var control = new MenuControl(5, 5, 15, 15);
		var ctx = GLOBALS.context;

		ctx.fillStyle	= GLOBALS.textColor;
		ctx.font	= GLOBALS.normalFont;

		// robots
		drawMenuItem(worldMap, ctx, control, 'userResources', 'robots');
		// user resources
		drawMenuItem(worldMap, ctx, control, 'naturalResources', 'MINERAL');
		drawMenuItem(worldMap, ctx, control, 'naturalResources', 'GAS');
	}
}

function drawMenuItem(worldMap, ctx, control, type, resource){
	drawMenuImage(ctx, control, type, resource);
	writeText(worldMap.parent.userResources.resources[resource], ctx, control);
}

function drawMenuImage(ctx, control, type, resource){
	ctx.drawImage(textureManager.textures[type][resource], control.left, control.top, control.width, control.height);
	control.left += control.width;
}

function writeText(text, ctx, control){
	ctx.fillText(text, control.left, control.top + 12);
	control.advanceHor();
}

export default TopMenu;

