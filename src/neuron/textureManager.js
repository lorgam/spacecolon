import GLOBALS			from '../globals/globals.js';
import MapTile			from '../world_map/mapTile.js';
import UserResources		from '../resources/userResources.js';
import lifeManager		from '../resources/lifeManager.js';
import naturalResourceManager	from '../resources/naturalResourceManager.js';

const textureManager = {
	textures : [],
	load : function(){
		var context, canvas, textures, size = 100;
		// tiles
		textures = [];
		for (var tileType in MapTile.prototype.tileTypes) {
			[canvas, context] = createCanvas(size, MapTile.prototype.tileTypes[tileType].color);
			textures[tileType] = canvas;
		}
		textureManager.textures['mapTile'] = textures;
		// wildlife
		textures = [];
		for (var life in lifeManager) {
			var elem = lifeManager[life];
			if (elem.color){
				[canvas, context] = createCanvas(size, elem.color);
				textures[life] = canvas;
			}
		}
		textureManager.textures['wildLife'] = textures;
		// user resources
		textures = [];
		[canvas, context] = createCanvas(size, GLOBALS.backgroundColor);
		addTriangle(context, size, "#FFFF00");
		textures['robots'] = canvas;

		textureManager.textures['userResources'] = textures;
		// natural resource
		textures = [];
		[canvas, context] = createCanvas(size, );

		for (var res  in naturalResourceManager) {
			var elem = naturalResourceManager[res];
			if (elem.color){
				[canvas, context] = createCanvas(size, elem.color);
				textures[res] = canvas;
			}
		}
		textureManager.textures['naturalResources'] = textures;
		// general
		textures = [];
		[canvas, context] = createCanvas(size, GLOBALS.backgroundColor);
		addTriangle(context, size, "#0FF");
		textures['city'] = canvas;

		textureManager.textures['general'] = textures;
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
