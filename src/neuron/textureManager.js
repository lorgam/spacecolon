import GLOBALS		from '../globals/globals.js';
import MapTile		from '../world_map/mapTile.js';
import UserResources	from '../resources/userResources.js';

const textureManager = {
	load : function(){
		var context, canvas, size = 100;
		// tiles
		for (var tileType in MapTile.prototype.tileTypes) {
			[canvas, context] = createCanvas(size, MapTile.prototype.tileTypes[tileType].color);
			MapTile.prototype.tileTypes[tileType].canvas = canvas;
		}

		[canvas, context] = createCanvas(size, GLOBALS.backgroundColor);
		addTriangle(context, size, "#FFFF00");
		UserResources.textures['robots'] = canvas;
	},
}

function createCanvas(size, back){
	var canvas		= document.createElement('canvas');
	canvas.width		= size;
	canvas.height		= size;
	var context		= canvas.getContext('2d');

	context.fillStyle	= back;
	context.fillRect(0, 0, size, size);

	return [canvas, context];

}

function addTriangle(ctx, size, color){
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(size/2, size);
	ctx.lineTo(size, 0);
	ctx.closePath();
	ctx.fill();
}

export default textureManager;
