function MapTile(parent, heightSeed, humiditySeed){
	this.parent			= parent;
	this.heightSeed		= heightSeed;
	this.humiditySeed	= humiditySeed;
	this.height 		= 0.5*this.heightSeed+0.5;
	this.type			= this.tileType(this.parent.waterHeight);
}

MapTile.prototype.tileTypes = {
	"deepOcean"			: {"color":"#0000FF"},
	"ocean"				: {"color":"#000088"},
	"beach"				: {"color":"#444400"},
	"highMountain"		: {"color":"#FFFFFF"},
	"desert"			: {"color":"#888800"},
	"grass"				: {"color":"#880000"},
	"forest"			: {"color":"#FF0000"},
	"desertMountain"	: {"color":"#FFFF00"},
	"grassMountain"		: {"color":"#880088"},
	"forestMountain"	: {"color":"#FF00FF"},
}

MapTile.prototype.tileType = function(waterHeight){
	var waterHeight = this.parent.waterHeight;
	if (this.height < waterHeight - 0.25)	return "deepOcean";
	if (this.height < waterHeight)			return "ocean";
	if (this.height < waterHeight + 0.05)	return "beach";
	if (this.height > 0.85)					return "highMountain";

	var heightDifference = 0.8 - waterHeight; //Amount of height left between beach and high mountain

	if (this.height < 0.6 * heightDifference + waterHeight){
		//Not mountain
		if (this.humiditySeed < 0)			return "desert";
		if (this.humiditySeed < 0.5)		return "grass";
		return "forest";
	}
	//Mountain
	if (this.humiditySeed < 0)			return "desertMountain";
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

export default MapTile;