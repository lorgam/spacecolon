const GLOBALS = {
	context					: null,
	hasToExit				: false,
	screenStack				: [],

	width					: 1000,
	height					: 750,
	mainScreenWidth			: 800,
	mainScreenHeight		: 600,
	topMenuHeight			: 25,
	tileSize				: 16,
	minTileSize				: 16,
	maxTileSize				: 64,

	menuFont				: "30px Arial",
	normalFont				: "14px Arial",

	backgroundColor			: "#000000",
	textColor				: "#FFFFFF",
	highlightColor			: "#FF0000",
};

GLOBALS.horizontalTilesToShow	= function(){return ~~(GLOBALS.mainScreenWidth  / GLOBALS.tileSize);}
GLOBALS.verticalTilesToShow		= function(){return ~~(GLOBALS.mainScreenHeight / GLOBALS.tileSize);}
GLOBALS.bottomOfMap				= function(){return GLOBALS.topMenuHeight + GLOBALS.mainScreenHeight;}
GLOBALS.rightMenuSize			= function(){return GLOBALS.width - GLOBALS.mainScreenWidth;}
GLOBALS.lowerMenuSize			= function(){return GLOBALS.height - GLOBALS.bottomOfMap();}
GLOBALS.fontHeight				= function(){return parseInt(GLOBALS.context.font.match(/\d+/));} //Requires the fonts to be specified in px

export default GLOBALS;
