import GLOBALS		from '../globals.js';
import PerlinNoise	from '../neuron/perlinNoise.js';
import MapTile		from './mapTile.js';

const WorldGenerator ={
	generate : function(parent){
		var mapCanvas		= document.createElement('canvas');
		mapCanvas.width		= parent.width * GLOBALS.maxTileSize; //Render the map to the max resolution and double it
		mapCanvas.height	= parent.height * GLOBALS.maxTileSize;
		var mapContext		= mapCanvas.getContext('2d');
		//Noise function for the map height
		var perlinNoise			= new PerlinNoise();
		//Displacements of the coordinates for the perlin noise algorithm
		var heightSeedX			= Math.random();
		var heightSeedY			= Math.random();
		var heightSeedZ			= Math.random();
		var humiditySeedX		= Math.random();
		var humiditySeedY		= Math.random();
		var humiditySeedZ		= Math.random();

		var faceWidth			= parent.width / 4;
		var heightStep			= 0.05; //steepness of the terrain. Bigger = more steepness. 0.4 Small islands 0.1 Big islands 0.05 Small continents 0.025 Big continents
		var heightSize			= heightStep*(faceWidth+1);
		var xHeightSize			= heightSize+heightSeedX;
		var zHeightSize			= heightSize+heightSeedZ;

		var humidityStep		= 0.1;
		var humiditySize		= humidityStep*(faceWidth+1);
		var xHumiditySize		= humiditySize+humiditySeedX;
		var zHumiditySize		= humiditySize+humiditySeedZ;
		//Generate map
		var map					= new Array(parent.width);
		var tileHeight,		xHeight,	yHeight;
		var tileHumidity,	xHumidity,	yHumidity;
		var mapTile, x;

		xHeight		= 0;
		xHumidity	= 0;
		for (var w = 0; w < faceWidth; w++){
			map[faceWidth-w-1]		= new Array(parent.height);
			map[faceWidth+w]		= new Array(parent.height);
			map[faceWidth*3-w-1]	= new Array(parent.height);
			map[faceWidth*3+w]		= new Array(parent.height);

			xHeight		+= heightStep;
			xHumidity	+= humidityStep;

			yHeight		=  heightSeedY;
			yHumidity	=  humiditySeedY;

			for (var h = 0; h < parent.height; h++){
				yHeight += heightStep;
				yHumidity += humidityStep;

				tileHeight					= perlinNoise.noise(heightSeedX,	yHeight,	heightSeedZ+xHeight);
				tileHumidity				= perlinNoise.noise(humiditySeedX,	yHumidity,	humiditySeedZ+xHumidity);

				x = faceWidth-w-1;
				mapTile						= new MapTile(parent, tileHeight, tileHumidity);
				map[x][h]					= mapTile;

				mapContext.fillStyle		= mapTile.mapColor();
				mapContext.fillRect(x * GLOBALS.maxTileSize, h * GLOBALS.maxTileSize, GLOBALS.maxTileSize, GLOBALS.maxTileSize);

				tileHeight					= perlinNoise.noise(heightSeedX+xHeight,		yHeight,	heightSeedZ);
				tileHumidity				= perlinNoise.noise(humiditySeedX+xHumidity,	yHumidity,	humiditySeedZ);

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
	}
}

export default WorldGenerator;