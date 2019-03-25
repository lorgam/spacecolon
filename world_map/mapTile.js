function MapTile(parent, heightSeed, humiditySeed){
	this.parent			= parent;
	this.heightSeed		= heightSeed;
	this.humiditySeed	= humiditySeed;
	this.height 		= 0.5*this.heightSeed+0.5;
	this.type			= this.tileType(this.parent.waterHeight);
}

MapTile.prototype.tileTypes = {
	"deepOcean"			: {"color":"#000044"},
	"ocean"				: {"color":"#000088"},
	"shallowWaters"		: {"color":"#0000FF"},
	"beach"				: {"color":"#FFFF00"},
	"highMountain"		: {"color":"#FFFFFF"},
	"desert"			: {"color":"#888800"},
	"grass"				: {"color":"#00FF00"},
	"forest"			: {"color":"#008800"},
	"desertMountain"	: {"color":"#444400"},
	"grassMountain"		: {"color":"#FF00FF"},
	"forestMountain"	: {"color":"#880088"},
}

MapTile.prototype.tileType = function(waterHeight){
	var waterHeight = this.parent.waterHeight;
	if (this.height < waterHeight - 0.25)	return "deepOcean";
	if (this.height < waterHeight - 0.05)	return "ocean";
	if (this.height < waterHeight)			return "shallowWaters";
	if (this.height < waterHeight + 0.02)	return "beach";
	if (this.height > 0.85)					return "highMountain";

	var heightDifference = 0.8 - waterHeight; //Amount of height left between beach and high mountain

	if (this.height < 0.6 * heightDifference + waterHeight){
		//Not mountain
		if (this.humiditySeed < -0.4)		return "desert";
		if (this.humiditySeed < 0.5)		return "grass";
		return "forest";
	}
	//Mountain
	if (this.humiditySeed < -0.4)		return "desertMountain";
	if (this.humiditySeed < 0.5)		return "grassMountain";
	return "forestMountain";
}

MapTile.prototype.color = function(){
	return this.tileTypes[this.type].color;
}
MapTile.prototype.heightGray = function(){
	var r = Math.lerp(0,255,this.height);
	return 'rgb('+r+','+r+','+r+')';
}
MapTile.prototype.humidityGray = function(){
	var r = Math.lerp(0,255,0.5 * this.humiditySeed + 0.5);
	return 'rgb('+r+','+r+','+r+')';
}
MapTile.prototype.texture = function(){
	return this.tileTypes[this.type].canvas;
}

export default MapTile;