import PerlinNoise	from '../neuron/perlinNoise.js';

const WorldGenerator ={
	generate : function(width, height){
		//Noise function for the map height
		var perlinNoise		= new PerlinNoise();
		var size			= 2;
		var seedX			= 1+Math.random()*250;
		var seedY			= 1+Math.random()*250;
		var seedZ			= 1+Math.random()*250; //Displacements of the coordinates for the perlin noise algorithm
		//Generate variables to use for the cylindrical projection of the map
		var faceWidth		= width / 4;
		var step			= size / faceWidth;
		var tileHeight, x, y;
		//Generate map
		var map				= new Array(width);

		for (var w = 0; w < faceWidth; w++){
			map[faceWidth-w-1]		= new Array(height);
			map[faceWidth+w]		= new Array(height);
			map[faceWidth*3-w-1]	= new Array(height);
			map[faceWidth*3+w]		= new Array(height);

			x = w*step;

			for (var h = 0; h < height; h++){
				y = h*step;

				tileHeight = perlinNoise.noise(seedX-step,seedY+y,seedZ+x);
				map[faceWidth-w-1][h] = new MapTile(tileHeight);

				tileHeight = perlinNoise.noise(seedX+x,seedY+y,seedZ);
				map[faceWidth+w][h] = new MapTile(tileHeight);

				tileHeight = perlinNoise.noise(seedX+size,seedY+y,seedZ+size-x);
				map[faceWidth*3-w-1][h] = new MapTile(tileHeight);

				tileHeight = perlinNoise.noise(seedX+size-x,seedY+y,seedZ+size);
				map[faceWidth*3+w][h] = new MapTile(tileHeight);
			}
		}

		return map;
	}
}

export default WorldGenerator;

function MapTile(seed){
	this.seed	= seed;
	this.height = 0.5+this.seed/2;
	/*var r = Math.lerp(0,255,this.height);
	this.color = 'rgb('+r+','+r+','+r+')';*/
	if (this.height > 0.85) this.color = "#FFFFFF"
	else if (this.height > 0.8) this.color = "#FF0000"
	else if (this.height > 0.7) this.color = "#FFFF00"
	else if (this.height > 0.5) this.color = "#00FF00"
	else this.color	= "#0000FF"
}