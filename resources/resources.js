const resources = {
	MINERAL	: {id:1,color:"#DC444F",text:"mineral"},
	GAS		: {id:2,color:"#CB8F1E",text:"gas"}
}

export default resources;


resources.generate = function(worldMap){
	var mapContext	= worldMap.mapCanvas.getContext('2d');
	var totalSize = worldMap.options.width * worldMap.options.height;
	var x, y, tile, total;
	//Generate minerals
	total = ~~(totalSize  * 0.0015);

	while (total > 0){
		x = ~~(Math.random() * worldMap.options.width);
		y = ~~(Math.random() * worldMap.options.height);

		tile = worldMap.map[x][y];

		if (tile.height > worldMap.options.waterHeight + 0.15){
			//Can have minerals
			if (tile.resource) continue;
			total--;
			tile.resource = resources.MINERAL;

			mapContext.fillStyle = resources.MINERAL.color;
			mapContext.fillRect(x * GLOBALS.maxTileSize, y * GLOBALS.maxTileSize, GLOBALS.maxTileSize, GLOBALS.maxTileSize);
		}
	}
	//Generate gas
	total = ~~(totalSize  * 0.0005);

	while (total > 0){
		x = ~~(Math.random() * worldMap.options.width);
		y = ~~(Math.random() * worldMap.options.height);

		tile = worldMap.map[x][y];

		if (tile.height < worldMap.options.waterHeight + 0.15){
			//Can have gas
			if (tile.resource) continue;
			total--;
			tile.resource = resources.GAS;

			mapContext.fillStyle = resources.GAS.color;
			mapContext.fillRect(x * GLOBALS.maxTileSize, y * GLOBALS.maxTileSize, GLOBALS.maxTileSize, GLOBALS.maxTileSize);
		}
	}
	//Generate life
}