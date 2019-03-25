const GLOBALS = {
	context					: null,
	hasToExit				: false,
	screenStack				: [],

	width					: 1024,
	height					: 768,
	mainScreenWidth			: 800,
	mainScreenHeight		: 600,
	topMenuHeight			: 25,
	tileSize				: 4,
	minTileSize				: 4,

	horizontalTilesToShow	: function(){return GLOBALS.mainScreenWidth  / GLOBALS.tileSize;},
	verticalTilesToShow		: function(){return GLOBALS.mainScreenHeight / GLOBALS.tileSize;},
	bottomOfMap				: function(){return GLOBALS.topMenuHeight + GLOBALS.mainScreenHeight;},

	menuFont				: "30px Arial",
	normalFont				: "14px Arial",

	fontHeight				: function(){return parseInt(GLOBALS.context.font.match(/\d+/));}, //Requires the fonts to be specified in px

	backgroundColor			: "#000000",
	textColor				: "#FFFFFF",
	highlightColor			: "#FF0000",
};

export default GLOBALS;