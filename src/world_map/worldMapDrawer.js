import GLOBALS  from '../globals/globals.js';

const WorldMapDrawer = {}

WorldMapDrawer.normalMapView = function(worldMap){
  var context = GLOBALS.context;
  var horizontalTilesToShow = GLOBALS.horizontalTilesToShow();
  var verticalTilesToShow   = GLOBALS.verticalTilesToShow();
  // Variables for the drawImage call
  var sx = worldMap.topLeftX * GLOBALS.maxTileSize();
  var sy = worldMap.topLeftY * GLOBALS.maxTileSize();
  var sWidth = horizontalTilesToShow * GLOBALS.maxTileSize();
  var sHeight = verticalTilesToShow * GLOBALS.maxTileSize();
  var dx = 0;
  var dy = GLOBALS.topMenuHeight;
  var dWidth = GLOBALS.mainScreenWidth;
  var dHeight = GLOBALS.mainScreenHeight;
  var horizontalTilesDrawn = worldMap.options.width - worldMap.topLeftX;

  context.drawImage(worldMap.mapCanvas, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  context.drawImage(worldMap.resourcesCanvas, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  if (horizontalTilesDrawn < horizontalTilesToShow){
    sx = 0;
    dx = horizontalTilesDrawn * GLOBALS.tileSize;

    context.drawImage(worldMap.mapCanvas, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    context.drawImage(worldMap.resourcesCanvas, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }

}
WorldMapDrawer.heightMapView = function(worldMap){
  var context = GLOBALS.context;
  var horizontalTilesToShow = GLOBALS.horizontalTilesToShow();
  var verticalTilesToShow   = GLOBALS.verticalTilesToShow();

  var w, h, mapTile, x, y;
  for (w = 0; w < horizontalTilesToShow; w++){
    x = w * GLOBALS.tileSize;

    for (h = 0; h < verticalTilesToShow; h++){
      y = h * GLOBALS.tileSize + GLOBALS.topMenuHeight;
      mapTile = worldMap.map[(worldMap.topLeftX + w) % worldMap.options.width][(worldMap.topLeftY + h) % worldMap.options.height];

      context.fillStyle = mapTile.heightGray();
      context.fillRect(x, y, GLOBALS.tileSize, GLOBALS.tileSize);
    }
  }
}
WorldMapDrawer.humidityMapView = function(worldMap){
  var context = GLOBALS.context;
  var horizontalTilesToShow = GLOBALS.horizontalTilesToShow();
  var verticalTilesToShow   = GLOBALS.verticalTilesToShow();

  var w, h, mapTile, x, y;
  for (w = 0; w < horizontalTilesToShow; w++){
    x = w * GLOBALS.tileSize;

    for (h = 0; h < verticalTilesToShow; h++){
      y = h * GLOBALS.tileSize + GLOBALS.topMenuHeight;
      mapTile = worldMap.map[(worldMap.topLeftX + w) % worldMap.options.width][(worldMap.topLeftY + h) % worldMap.options.height];

      context.fillStyle = mapTile.humidityGray();
      context.fillRect(x, y, GLOBALS.tileSize, GLOBALS.tileSize);
    }
  }
}
WorldMapDrawer.blockMapView = function(worldMap){
  var context = GLOBALS.context;
  var horizontalTilesToShow = GLOBALS.horizontalTilesToShow();
  var verticalTilesToShow   = GLOBALS.verticalTilesToShow();

  var w, h, mapTile, x, y;
  for (w = 0; w < horizontalTilesToShow; w++){
    x = w * GLOBALS.tileSize;

    for (h = 0; h < verticalTilesToShow; h++){
      y = h * GLOBALS.tileSize + GLOBALS.topMenuHeight;
      mapTile = worldMap.map[(worldMap.topLeftX + w) % worldMap.options.width][(worldMap.topLeftY + h) % worldMap.options.height];

      context.fillStyle = mapTile.mapColor();
      context.fillRect(x, y, GLOBALS.tileSize, GLOBALS.tileSize);
    }
  }
}

WorldMapDrawer.drawArray = [
  WorldMapDrawer.normalMapView,
  WorldMapDrawer.heightMapView,
  WorldMapDrawer.humidityMapView,
  WorldMapDrawer.blockMapView
]

export default WorldMapDrawer;

