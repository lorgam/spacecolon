import GLOBALS		from '../globals.js';
import PerlinNoise	from '../neuron/perlinNoise.js';
import MapTile		from './mapTile.js';

const WorldGenerator ={
	generate : function(parent){
		//MiniMap
		var miniMapCanvas		= document.createElement('canvas');
		miniMapCanvas.width		= parent.width;
		miniMapCanvas.height	= parent.height;
		var miniMapContext		= miniMapCanvas.getContext('2d');
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

				miniMapContext.fillStyle	= mapTile.mapColor();
				miniMapContext.fillRect(x, h, 1, 1);

				tileHeight					= perlinNoise.noise(heightSeedX+xHeight,		yHeight,	heightSeedZ);
				tileHumidity				= perlinNoise.noise(humiditySeedX+xHumidity,	yHumidity,	humiditySeedZ);

				x = faceWidth+w;
				mapTile						= new MapTile(parent, tileHeight, tileHumidity);
				map[x][h]					= mapTile;

				miniMapContext.fillStyle	= mapTile.mapColor();
				miniMapContext.fillRect(x, h, 1, 1);

				tileHeight					= perlinNoise.noise(xHeightSize,	yHeight,	zHeightSize-xHeight);
				tileHumidity				= perlinNoise.noise(xHumiditySize,	yHumidity,	zHumiditySize-xHumidity);

				x = faceWidth*3-w-1;
				mapTile						= new MapTile(parent, tileHeight, tileHumidity);
				map[x][h]					= mapTile;

				miniMapContext.fillStyle	= mapTile.mapColor();
				miniMapContext.fillRect(x, h, 1, 1);

				tileHeight					= perlinNoise.noise(xHeightSize-xHeight,		yHeight,	zHeightSize);
				tileHumidity				= perlinNoise.noise(xHumiditySize-xHumidity,	yHumidity,	zHumiditySize);

				x = faceWidth*3+w;
				mapTile						= new MapTile(parent, tileHeight, tileHumidity);
				map[x][h]					= mapTile;

				miniMapContext.fillStyle	= mapTile.mapColor();
				miniMapContext.fillRect(x, h, 1, 1);
			}
		}

		parent.map			= map;

		var mapCanvas		= document.createElement('canvas');
		var mapContext		= mapCanvas.getContext('2d');
		mapCanvas.width		= miniMapCanvas.width * 2;
		mapCanvas.height	= miniMapCanvas.height * 2;

		mapContext.drawImage(miniMapCanvas, 0, 0);
		mapContext.drawImage(miniMapCanvas, miniMapCanvas.width, 0);

		parent.miniMap		= miniMapCanvas;
		parent.mapCanvas	= mapCanvas;
	}
}

export default WorldGenerator;