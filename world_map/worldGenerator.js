import GLOBALS		from '../globals.js';
import PerlinNoise	from '../neuron/perlinNoise.js';
import MapTile		from './mapTile.js';

const WorldGenerator ={
	generateWorld : function(parent){
		var mapCanvas		= document.createElement('canvas');
		mapCanvas.width		= parent.options.width * GLOBALS.maxTileSize; //Render the map to the max resolution and double it
		mapCanvas.height	= parent.options.height * GLOBALS.maxTileSize;
		var mapContext		= mapCanvas.getContext('2d');
		//Noise function for the map height
		var perlinNoise		= new PerlinNoise();

		//steepness of the terrain. Bigger = more steepness. 0.25 Small islands 0.1 Big islands 0.05 Small continents 0.025 Big continents
		var heightStep		= 0.05 + Math.random() * 0.03;
		var humidityStep	= 0.075 + Math.random() * 0.05;

		var angularChange	= 2 * Math.PI / parent.options.width;
		var radius			= parent.options.width / 8;
		var angle			= 0

		var xHeight, zHeight;
		var xHumidity, zHumidity;
		var tileHeight, tileHumidity, mapTile;
		var sin, cos;

		//Generate map
		var map				= new Array(parent.options.width);
		for (var w = 0; w < parent.options.width; w++){
			map[w] = new Array(parent.options.height);

			sin = radius * Math.sin(angle);
			cos = radius * Math.cos(angle);

			xHeight = heightStep * sin + parent.options.heightSeedX;
			zHeight = heightStep * cos + parent.options.heightSeedZ;

			xHumidity = humidityStep * sin + parent.options.humiditySeedX;
			zHumidity = humidityStep * cos + parent.options.humiditySeedZ;

			for (var h = 0; h < parent.options.height; h++){
				tileHeight				= perlinNoise.noise(xHeight, h * heightStep + parent.options.heightSeedY, zHeight);
				tileHumidity			= perlinNoise.noise(xHumidity, h * humidityStep + parent.options.humiditySeedY, zHumidity);

				mapTile					= new MapTile(parent, tileHeight, tileHumidity);
				map[w][h]				= mapTile;

				mapContext.fillStyle	= mapTile.mapColor();
				mapContext.fillRect(w * GLOBALS.maxTileSize, h * GLOBALS.maxTileSize, GLOBALS.maxTileSize, GLOBALS.maxTileSize);
			}

			angle += angularChange;
		}

		parent.map			= map;
		parent.mapCanvas	= mapCanvas;
	},

	generateOptions : function(definition){
		var sizeSeed			= 40 + ~~(Math.random() * 20)
		var options 			= {};
		options.width			= sizeSeed * 4;
		options.height			= sizeSeed * 3;

		if (definition.type == 'normal'){
			options.waterHeight		= 0.35 + Math.random() * 0.3;

			options.heightSeedX		= Math.random();
			options.heightSeedY		= Math.random();
			options.heightSeedZ		= Math.random();

			options.humiditySeedX	= Math.random();
			options.humiditySeedY	= Math.random();
			options.humiditySeedZ	= Math.random();
		}

		return options;
	}
}

export default WorldGenerator;