const GLOBALS = {
  context       : null,
  hasToExit     : false,

  width       : 1024,
  height        : 25+768,
  mainScreenWidth     : 896,
  mainScreenHeight    : 672,
  topMenuHeight     : 25,
  tileSize      : 16,

  menuFont      : "30px Arial",
  buttonFont      : "22px Arial",
  normalFont      : "14px Arial",

  backgroundColor     : "#000",
  textColor     : "#FFF",
  highlightColor      : "#F00",

  verticalButtonSize    : 44
};

GLOBALS.minTileSize     = function(){return 8;}
GLOBALS.mediumTileSize      = function(){return 16;}
GLOBALS.maxTileSize     = function(){return 32;}
GLOBALS.horizontalTilesToShow   = function(){return ~~(GLOBALS.mainScreenWidth  / GLOBALS.tileSize);}
GLOBALS.verticalTilesToShow   = function(){return ~~(GLOBALS.mainScreenHeight / GLOBALS.tileSize);}
GLOBALS.bottomOfMap     = function(){return GLOBALS.topMenuHeight + GLOBALS.mainScreenHeight;}
GLOBALS.rightMenuSize     = function(){return GLOBALS.width - GLOBALS.mainScreenWidth;}
GLOBALS.lowerMenuSize     = function(){return GLOBALS.height - GLOBALS.bottomOfMap();}
GLOBALS.fontHeight      = function(){return parseInt(GLOBALS.context.font.match(/\d+/));} //Requires the fonts to be specified in px

export default GLOBALS;

