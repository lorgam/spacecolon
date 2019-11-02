import GLOBALS			from '../globals/globals.js';
import textureManager 		from '../neuron/textureManager.js';
import PerlinNoise		from '../neuron/perlinNoise.js';
import naturalResourceManager	from '../resources/naturalResourceManager.js';
import MapTile			from './mapTile.js';
import City			from './city/city.js';

const WorldGenerator ={}

WorldGenerator.generate = function(worldMap){
	WorldGenerator.generateWorld(worldMap);
	WorldGenerator.generateStartingPoint(worldMap);
	naturalResourceManager.generateResources(worldMap);
}

WorldGenerator.generateWorld = function(worldMap){
/*
//@Debug: Secondary canvas showing what we have generated
var mapSecCanvas		= document.getElementById('sec_canvas');
var mapSecContext		= mapSecCanvas.getContext('2d');

mapSecContext.fillStyle = "#F00";
mapSecContext.fillRect(0, 0, 1000, 750);

//@Debug
*/

	var mapCanvas		= document.createElement('canvas');
	mapCanvas.width		= worldMap.options.width * GLOBALS.maxTileSize(); //Render the map to the max resolution
	mapCanvas.height	= worldMap.options.height * GLOBALS.maxTileSize();
	var mapContext		= mapCanvas.getContext('2d');
	//Noise function for the map height and humidity
	var perlinNoise		= new PerlinNoise();
	//steepness of the terrain. Bigger = more steepness
	var heightStep		= 0.04 + Math.random() * 0.05;
	var humidityStep	= 0.075 + Math.random() * 0.05;

	var angularChange	= 2 * Math.PI / worldMap.options.width;
	var radius		= worldMap.options.width / 8;
	var angle		= 0
	//Generate map
	var map			= new Array(worldMap.options.width);

	var xHeight, zHeight;
	var xHumidity, zHumidity;
	var tileHeight, tileHumidity, mapTile;
	var sin, cos;

	for (var w = 0; w < worldMap.options.width; w++){
		map[w] = new Array(worldMap.options.height);

		sin = radius * Math.sin(angle);
		cos = radius * Math.cos(angle);

		xHeight = heightStep * sin + worldMap.options.heightSeedX;
		zHeight = heightStep * cos + worldMap.options.heightSeedZ;

		xHumidity = humidityStep * sin + worldMap.options.humiditySeedX;
		zHumidity = humidityStep * cos + worldMap.options.humiditySeedZ;

		for (var h = 0; h < worldMap.options.height; h++){
			tileHeight	= perlinNoise.noise(xHeight, h * heightStep + worldMap.options.heightSeedY, zHeight);
			tileHumidity	= perlinNoise.noise(xHumidity, h * humidityStep + worldMap.options.humiditySeedY, zHumidity);

			mapTile		= new MapTile(worldMap, tileHeight, tileHumidity, w, h);
			map[w][h]	= mapTile;

			mapContext.drawImage(textureManager.textures['mapTile'][mapTile.type], w * GLOBALS.maxTileSize(), h * GLOBALS.maxTileSize(), GLOBALS.maxTileSize(), GLOBALS.maxTileSize());

			worldMap.stats[mapTile.type] += 1;
		}

		angle += angularChange;
	}

	worldMap.map		= map;
	worldMap.mapCanvas	= mapCanvas;
/*
	//@Debug: Secondary canvas showing what we have generated

	mapSecContext.fillStyle = "#F00";
	mapSecContext.drawImage(mapCanvas, 0, 0, 1000, 750);

	//@Debug
*/
}

WorldGenerator.generateStartingPoint = function(worldMap){
	var x,y;

	do {
		x = ~~(Math.random() * worldMap.options.width);
		y = 15 + ~~(Math.random() * (worldMap.options.height - 30));
	} while(worldMap.map[x][y].type != "grass");

	var mapContext		= worldMap.mapCanvas.getContext('2d');
	mapContext.drawImage(textureManager.textures['general']['city'], x * GLOBALS.maxTileSize(), y * GLOBALS.maxTileSize(), GLOBALS.maxTileSize(), GLOBALS.maxTileSize());

	worldMap.map[x][y].state = new City(worldMap.map[x][y]);

	worldMap.startingPointX = x;
	worldMap.startingPointY = y;
	worldMap.centerViewonStartingPoint();
}

WorldGenerator.generateOptions = function(definition){
	var sizeSeed			= 24 + ~~(Math.random() * 15);
	var options 			= {};
	options.width			= sizeSeed * 4;
	options.height			= sizeSeed * 3;

	if (definition.type == 'normal'){
		options.waterHeight		= 0.35 + Math.random() * 0.2;

		options.heightSeedX		= Math.random();
		options.heightSeedY		= Math.random();
		options.heightSeedZ		= Math.random();

		options.humiditySeedX	= Math.random();
		options.humiditySeedY	= Math.random();
		options.humiditySeedZ	= Math.random();
	}

	return options;
}

export default WorldGenerator;
