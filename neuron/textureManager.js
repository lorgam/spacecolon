import MapTile	from '../world_map/mapTile.js';

const textureManager = {
	load : function(){
		var context, canvas, size = 100;

		for (var tileType in MapTile.prototype.tileTypes) {
			canvas				= document.createElement('canvas');
			canvas.width		= size;
			canvas.height		= size;
			context				= canvas.getContext('2d');

			context.fillStyle	= MapTile.prototype.tileTypes[tileType].color;
			context.fillRect(0, 0, size, size);

			MapTile.prototype.tileTypes[tileType].canvas = canvas;
		}
	}
}

export default textureManager;