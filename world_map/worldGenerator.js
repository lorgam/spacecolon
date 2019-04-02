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
		var perlinNoise			= new PerlinNoise();

		var faceWidth			= parent.options.width / 4;
		var heightStep			= 0.05; //steepness of the terrain. Bigger = more steepness. 0.4 Small islands 0.1 Big islands 0.05 Small continents 0.025 Big continents
		var heightSize			= heightStep*(faceWidth+1);
		var xHeightSize			= heightSize+parent.options.heightSeedX;
		var zHeightSize			= heightSize+parent.options.heightSeedZ;

		var humidityStep		= 0.1;
		var humiditySize		= humidityStep*(faceWidth+1);
		var xHumiditySize		= humiditySize+parent.options.humiditySeedX;
		var zHumiditySize		= humiditySize+parent.options.humiditySeedZ;
		//Generate map
		var map					= new Array(parent.options.width);
		var tileHeight,		xHeight,	yHeight;
		var tileHumidity,	xHumidity,	yHumidity;
		var mapTile, x;

		xHeight		= 0;
		xHumidity	= 0;
		for (var w = 0; w < faceWidth; w++){
			map[faceWidth-w-1]		= new Array(parent.options.height);
			map[faceWidth+w]		= new Array(parent.options.height);
			map[faceWidth*3-w-1]	= new Array(parent.options.height);
			map[faceWidth*3+w]		= new Array(parent.options.height);

			xHeight		+= heightStep;
			xHumidity	+= humidityStep;

			yHeight		=  parent.options.heightSeedY;
			yHumidity	=  parent.options.humiditySeedY;

			for (var h = 0; h < parent.options.height; h++){
				yHeight += heightStep;
				yHumidity += humidityStep;

				tileHeight					= perlinNoise.noise(parent.options.heightSeedX,		yHeight,	parent.options.heightSeedZ+xHeight);
				tileHumidity				= perlinNoise.noise(parent.options.humiditySeedX,	yHumidity,	parent.options.humiditySeedZ+xHumidity);

				x = faceWidth-w-1;
				mapTile						= new MapTile(parent, tileHeight, tileHumidity);
				map[x][h]					= mapTile;

				mapContext.fillStyle		= mapTile.mapColor();
				mapContext.fillRect(x * GLOBALS.maxTileSize, h * GLOBALS.maxTileSize, GLOBALS.maxTileSize, GLOBALS.maxTileSize);

				tileHeight					= perlinNoise.noise(parent.options.heightSeedX+xHeight,		yHeight,	parent.options.heightSeedZ);
				tileHumidity				= perlinNoise.noise(parent.options.humiditySeedX+xHumidity,	yHumidity,	parent.options.humiditySeedZ);

				x = faceWidth+w;
				mapTile						= new MapTile(parent, tileHeight, tileHumidity);
				map[x][h]					= mapTile;

				mapContext.fillStyle		= mapTile.mapColor();
				mapContext.fillRect(x * GLOBALS.maxTileSize, h * GLOBALS.maxTileSize, GLOBALS.maxTileSize, GLOBALS.maxTileSize);

				tileHeight					= perlinNoise.noise(xHeightSize,	yHeight,	zHeightSize-xHeight);
				tileHumidity				= perlinNoise.noise(xHumiditySize,	yHumidity,	zHumiditySize-xHumidity);

				x = faceWidth*3-w-1;
				mapTile						= new MapTile(parent, tileHeight, tileHumidity);
				map[x][h]					= mapTile;

				mapContext.fillStyle		= mapTile.mapColor();
				mapContext.fillRect(x * GLOBALS.maxTileSize, h * GLOBALS.maxTileSize, GLOBALS.maxTileSize, GLOBALS.maxTileSize);

				tileHeight					= perlinNoise.noise(xHeightSize-xHeight,		yHeight,	zHeightSize);
				tileHumidity				= perlinNoise.noise(xHumiditySize-xHumidity,	yHumidity,	zHumiditySize);

				x = faceWidth*3+w;
				mapTile						= new MapTile(parent, tileHeight, tileHumidity);
				map[x][h]					= mapTile;

				mapContext.fillStyle		= mapTile.mapColor();
				mapContext.fillRect(x * GLOBALS.maxTileSize, h * GLOBALS.maxTileSize, GLOBALS.maxTileSize, GLOBALS.maxTileSize);
			}
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