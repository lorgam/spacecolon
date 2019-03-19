import PerlinNoise	from '../neuron/perlinNoise.js';

const WorldGenerator ={
	generate : function(width, height){
		//Noise function for the map height
		var perlinNoise		= new PerlinNoise();
		var size			= 20;
		var seed			= Math.random();
		//Generate map
		var map				= new Array(width);

		for (var w = 0; w < width; w++){
			map[w] = new Array(height);

			for (var h = 0; h < height; h++){
				var tileHeight = perlinNoise.noise(size*w / width, size*h / height, seed);
				map[w][h] = new MapTile(0.5+(tileHeight/2));
			}
		}

		return map;
	}
}

export default WorldGenerator;

function MapTile(height){
	this.height = height;
	if (this.height > 0.8) this.color = "#FF0000"
	else if (this.height > 0.7) this.color = "#FFFF00"
	else if (this.height > 0.45) this.color = "#00FF00"
	else this.color	= "#0000FF"
}