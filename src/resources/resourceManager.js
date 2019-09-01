import GLOBALS	from '../globals/globals.js';

const resourceManager = {
	MINERAL	: {id:1,color:"#DC444F",text:"mineral",default:100},
	GAS		: {id:2,color:"#CB8F1E",text:"gas",default:0}
}

export default resourceManager;

resourceManager.generateResources = function(worldMap){
	var mapContext	= worldMap.mapCanvas.getContext('2d');
	var totalSize = worldMap.options.width * worldMap.options.height;

	resourceManager.generateMinerals(worldMap, mapContext, totalSize);
	resourceManager.generateGas(worldMap, mapContext, totalSize);
}

resourceManager.generateMinerals = function(worldMap, mapContext, totalSize){
	var x, y, tile, total;

	total = ~~(totalSize  * 0.0015);

	while (total > 0){
		x = ~~(Math.random() * worldMap.options.width);
		y = ~~(Math.random() * worldMap.options.height);

		tile = worldMap.map[x][y];

		if (tile.height > worldMap.options.waterHeight + 0.15){
			//Can have minerals
			if (tile.resource) continue;
			total--;

			tile.resource = resourceManager.MINERAL;

			mapContext.fillStyle = resourceManager.MINERAL.color;
			mapContext.fillRect(x * GLOBALS.maxTileSize(), y * GLOBALS.maxTileSize(), GLOBALS.maxTileSize(), GLOBALS.maxTileSize());
		}
	}
}

resourceManager.generateGas = function(worldMap, mapContext, totalSize){
	var x, y, tile, total;
	total = ~~(totalSize  * 0.0005);

	while (total > 0){
		x = ~~(Math.random() * worldMap.options.width);
		y = ~~(Math.random() * worldMap.options.height);

		tile = worldMap.map[x][y];

		if (tile.height < worldMap.options.waterHeight + 0.15){
			//Can have gas
			if (tile.resource) continue;
			total--;
			tile.resource = resourceManager.GAS;

			mapContext.fillStyle = resourceManager.GAS.color;
			mapContext.fillRect(x * GLOBALS.maxTileSize(), y * GLOBALS.maxTileSize(), GLOBALS.maxTileSize(), GLOBALS.maxTileSize());
		}
	}
}
