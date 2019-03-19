const GLOBALS = {
	hasToExit				: false,
	screenStack				: [],

	width					: 1024,
	height					: 768,
	mainScreenWidth			: 800,
	mainScreenHeight		: 600,
	tileSize				: 10,

	horizontalTilesToShow	: function(){return GLOBALS.mainScreenWidth  / GLOBALS.tileSize;},
	verticalTilesToShow		: function(){return GLOBALS.mainScreenHeight / GLOBALS.tileSize;},

	menuFont				: "30px Arial",
	normalFont				: "14px Arial",

	backgroundColor			: "#000000",
	textColor				: "#FFFFFF",
	highlightColor			: "#FF0000",
};

export default GLOBALS;