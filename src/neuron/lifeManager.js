import GLOBALS	from '../globals/globals.js';

const lifeManager = {
	SEALIFE: {radius:15,color:"#FFFFFF",text:"fish"},
	GRASSLIFE: {radius:15,color:"#5774AA",text:"hervibore"}
}

export default lifeManager;

lifeManager.generateLife = function(worldMap){
	var mapContext	= worldMap.mapCanvas.getContext('2d');
	var totalSize = worldMap.options.width * worldMap.options.height;
	var x, y, tile, total, totalSeaLife;
	//Generate life
	total = ~~(totalSize  * 0.0005);
	totalSeaLife = total * 0.3;

	while (totalSeaLife > 0){
		x = ~~(Math.random() * worldMap.options.width);
		y = ~~(Math.random() * worldMap.options.height);

		tile = worldMap.map[x][y];

		if (tile.life || (tile.type != "deepOcean" && tile.type != "ocean")) continue;

		total--;
		totalSeaLife--;

		tile.life = lifeManager.SEALIFE;

		mapContext.fillStyle = lifeManager.SEALIFE.color;
		mapContext.fillRect(x * GLOBALS.maxTileSize, y * GLOBALS.maxTileSize, GLOBALS.maxTileSize, GLOBALS.maxTileSize);
	}

	while (total > 0){
		x = ~~(Math.random() * worldMap.options.width);
		y = ~~(Math.random() * worldMap.options.height);

		tile = worldMap.map[x][y];

		if (tile.life || tile.type != "grass") continue;

		total--;

		tile.life = lifeManager.GRASSLIFE;

		mapContext.fillStyle = lifeManager.GRASSLIFE.color;
		mapContext.fillRect(x * GLOBALS.maxTileSize, y * GLOBALS.maxTileSize, GLOBALS.maxTileSize, GLOBALS.maxTileSize);
	}
}
