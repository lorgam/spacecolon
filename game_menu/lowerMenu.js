import GLOBALS		from '../globals.js';

function LowerMenu(){}

LowerMenu.prototype.draw = function(tile){
	if (!tile) return;

	var context			= GLOBALS.context;

	context.fillStyle	= GLOBALS.textColor;
	context.font		= GLOBALS.normalFont;
	var fontHeight		= GLOBALS.fontHeight();

	var top, text;

	top		= GLOBALS.bottomOfMap() + GLOBALS.topMenuHeight;
	text	= tile.type;
	context.fillText(text, 15, top);

	top		+= fontHeight;
	text	=  'Height: ' + tile.height;
	context.fillText(text, 15, top);

	top		+= fontHeight;
	text	=  'Humidity: ' + tile.humiditySeed;
	context.fillText(text, 15, top);
}

export default LowerMenu;