import GLOBALS			from '../globals/globals.js';
import MapTile			from '../world_map/mapTile.js';
import lifeManager		from '../resources/lifeManager.js';
import naturalResourceManager	from '../resources/naturalResourceManager.js';

const textureManager = {
	textures : [],
	load : function(){
		var canvas, textures, size = 100;

		// tiles
		textures = [];

		for (var tileType in MapTile.prototype.tileTypes) {
			canvas = createCanvas(size, size);
			addBackground(canvas, MapTile.prototype.tileTypes[tileType].color);
			textures[tileType] = canvas;
		}

		textureManager.textures['mapTile'] = textures;

		// wildlife
		textures = [];

		for (var life in lifeManager) {
			var elem = lifeManager[life];
			if (elem.color){
				canvas = createCanvas(size, size);
				addBackground(canvas, elem.color);
				textures[life] = canvas;
			}
		}

		textureManager.textures['wildLife'] = textures;

		// user resources
		textures = [];

		canvas = createCanvas(size, size);
		addTriangle(canvas, size, "#FF0");
		textures['robots'] = canvas;

		textureManager.textures['userResources'] = textures;

		// natural resource
		textures = [];

		for (var res  in naturalResourceManager.resources) {
			canvas = createCanvas(size, size);
			addDiamond(canvas, size, naturalResourceManager.resources[res].color);
			textures[res] = canvas;
		}

		textureManager.textures['naturalResources'] = textures;

		// general
		textures = [];

		canvas = createCanvas(size, size);
		addTriangle(canvas, size, "#0FF");
		textures['city'] = canvas;

		textureManager.textures['general'] = textures;
	},
}

function createCanvas(width, height){
	var canvas		= document.createElement('canvas');
	canvas.width		= width;
	canvas.height		= height;

	return canvas;
}

function addBackground(canvas, back){
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = back;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

}

function addDiamond(canvas, size, color){
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(0,size/2);
	ctx.lineTo(size/2, size);
	ctx.lineTo(size, size/2);
	ctx.lineTo(size/2, 0);
	ctx.closePath();
	ctx.fill();
}

function addTriangle(canvas, size, color){
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(size/2, size);
	ctx.lineTo(size, 0);
	ctx.closePath();
	ctx.fill();
}

export default textureManager;
