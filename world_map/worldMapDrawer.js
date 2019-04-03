const WorldMapDrawer = {}

WorldMapDrawer.normalMapView = function(worldMap){
	var context = GLOBALS.context;
	var horizontalTilesToShow	= GLOBALS.horizontalTilesToShow();
	var verticalTilesToShow		= GLOBALS.verticalTilesToShow();

	context.drawImage(	worldMap.mapCanvas,
								worldMap.topLeftX * GLOBALS.maxTileSize, worldMap.topLeftY * GLOBALS.maxTileSize, horizontalTilesToShow * GLOBALS.maxTileSize, verticalTilesToShow * GLOBALS.maxTileSize,
								0, GLOBALS.topMenuHeight, GLOBALS.mainScreenWidth, GLOBALS.mainScreenHeight
							);

	var horizontalTilesDrawn = worldMap.options.width - worldMap.topLeftX;
	if (horizontalTilesDrawn < horizontalTilesToShow){
		context.drawImage(	worldMap.mapCanvas,
							0, worldMap.topLeftY * GLOBALS.maxTileSize, horizontalTilesToShow * GLOBALS.maxTileSize, verticalTilesToShow * GLOBALS.maxTileSize,
							horizontalTilesDrawn * GLOBALS.tileSize, GLOBALS.topMenuHeight, GLOBALS.mainScreenWidth, GLOBALS.mainScreenHeight
						);
		horizontalTilesDrawn +=  worldMap.map.width;
	}
}
WorldMapDrawer.heightMapView = function(worldMap){
	var context = GLOBALS.context;
	var horizontalTilesToShow	= GLOBALS.horizontalTilesToShow();
	var verticalTilesToShow		= GLOBALS.verticalTilesToShow();

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
	var horizontalTilesToShow	= GLOBALS.horizontalTilesToShow();
	var verticalTilesToShow		= GLOBALS.verticalTilesToShow();

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
	var horizontalTilesToShow	= GLOBALS.horizontalTilesToShow();
	var verticalTilesToShow		= GLOBALS.verticalTilesToShow();

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