import GLOBALS		from '../globals/globals.js';
import textureManager 	from '../neuron/textureManager.js';

const naturalResourceManager = {
	MINERAL	: {id:1,color:"#DC444F",text:"mineral",default:100},
	GAS	: {id:2,color:"#CB8F1E",text:"gas",default:0}
}

export default naturalResourceManager;

naturalResourceManager.generateResources = function(worldMap){
	var mapContext	= worldMap.mapCanvas.getContext('2d');
	var totalSize = worldMap.options.width * worldMap.options.height;

	naturalResourceManager.generateMinerals(worldMap, mapContext, totalSize);
	naturalResourceManager.generateGas(worldMap, mapContext, totalSize);
}

naturalResourceManager.generateMinerals = function(worldMap, mapContext, totalSize){
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

			tile.resource = naturalResourceManager.MINERAL;

			mapContext.drawImage(textureManager.textures['naturalResources']['MINERAL'], x * GLOBALS.maxTileSize(), y * GLOBALS.maxTileSize(), GLOBALS.maxTileSize(), GLOBALS.maxTileSize());
		}
	}
}

naturalResourceManager.generateGas = function(worldMap, mapContext, totalSize){
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
			tile.resource = naturalResourceManager.GAS;

			mapContext.drawImage(textureManager.textures['naturalResources']['GAS'], x * GLOBALS.maxTileSize(), y * GLOBALS.maxTileSize(), GLOBALS.maxTileSize(), GLOBALS.maxTileSize());
		}
	}
}
