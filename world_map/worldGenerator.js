import PerlinNoise		from '../neuron/perlinNoise.js';
import resourceManager	from '../neuron/resourceManager.js';
import MapTile			from './mapTile.js';

const WorldGenerator ={}

WorldGenerator.generate = function(worldMap){
	WorldGenerator.generateWorld(worldMap);
	resourceManager.generateResources(worldMap);
}

WorldGenerator.generateWorld = function(worldMap){
	var mapCanvas		= document.createElement('canvas');
	mapCanvas.width		= worldMap.options.width * GLOBALS.maxTileSize; //Render the map to the max resolution and double it
	mapCanvas.height	= worldMap.options.height * GLOBALS.maxTileSize;
	var mapContext		= mapCanvas.getContext('2d');
	//Noise function for the map height and humidity
	var perlinNoise		= new PerlinNoise();
	//steepness of the terrain. Bigger = more steepness
	var heightStep		= 0.04 + Math.random() * 0.05;
	var humidityStep	= 0.075 + Math.random() * 0.05;

	var angularChange	= 2 * Math.PI / worldMap.options.width;
	var radius			= worldMap.options.width / 8;
	var angle			= 0
	//Generate map
	var map				= new Array(worldMap.options.width);

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
			tileHeight				= perlinNoise.noise(xHeight, h * heightStep + worldMap.options.heightSeedY, zHeight);
			tileHumidity			= perlinNoise.noise(xHumidity, h * humidityStep + worldMap.options.humiditySeedY, zHumidity);

			mapTile					= new MapTile(worldMap, tileHeight, tileHumidity);
			map[w][h]				= mapTile;

			mapContext.fillStyle	= mapTile.mapColor();
			mapContext.fillRect(w * GLOBALS.maxTileSize, h * GLOBALS.maxTileSize, GLOBALS.maxTileSize, GLOBALS.maxTileSize);
		}

		angle += angularChange;
	}

	worldMap.map		= map;
	worldMap.mapCanvas	= mapCanvas;
}

WorldGenerator.generateOptions = function(definition){
	var sizeSeed			= 40 + ~~(Math.random() * 20);
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