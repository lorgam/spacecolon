import aux    from '../globals/auxiliar.js';
import textureManager   from '../neuron/textureManager.js';
import MapPoint2d   from '../neuron/physics/mapPoint2d.js';

function MapTile(parent, heightSeed, humiditySeed, x, y){
  this.parent = parent;
  this.heightSeed = heightSeed;
  this.humiditySeed = humiditySeed;
  this.height = 0.5*this.heightSeed+0.5;
  this.type = this.tileType(this.parent.options.waterHeight);
  this.water = this.height < this.parent.options.waterHeight;
  this.resource = null;
  this.building = null;
  this.unit = null;
  this.pos = new MapPoint2d(x, y, parent);
}

MapTile.prototype.tileTypes = {
  "deepOcean" : {"color":"#072253"},
  "ocean" : {"color":"#12326E"},
  "shallowWaters" : {"color":"#1F4487"},
  "beach" : {"color":"#FFCF75"},
  "highMountain" : {"color":"#7A0009"},
  "desert" : {"color":"#E2AB46"},
  "grass" : {"color":"#71D361"},
  "forest" : {"color":"#1B880A"},
  "desertMountain" : {"color":"#7D5100"},
  "grassMountain" : {"color":"#4BBB3A"},
  "forestMountain" : {"color":"#0E6700"},
}

MapTile.prototype.tileType = function(waterHeight){
  if (this.height < waterHeight - 0.25) return "deepOcean";
  if (this.height < waterHeight - 0.05) return "ocean";
  if (this.height < waterHeight)    return "shallowWaters";
  if (this.height < waterHeight + 0.013)  return "beach";
  if (this.height > 0.85)     return "highMountain";

  var heightDifference = 0.8 - waterHeight; //Amount of height left between beach and high mountain

  if (this.height < 0.6 * heightDifference + waterHeight){
    //Not mountain
    if (this.humiditySeed < -0.4) return "desert";
    if (this.humiditySeed < 0.5)  return "grass";
    return "forest";
  }
  //Mountain
  if (this.humiditySeed < -0.4) return "desertMountain";
  if (this.humiditySeed < 0.5)  return "grassMountain";
  return "forestMountain";
}

MapTile.prototype.mapColor = function(){
  return this.tileTypes[this.type].color;
}
MapTile.prototype.heightGray = function(){
  var r = aux.getGrey(this.height);
  return 'rgb('+r+','+r+','+r+')';
}
MapTile.prototype.humidityGray = function(){
  var r = aux.getGrey(0.5 * this.humiditySeed + 0.5);
  return 'rgb('+r+','+r+','+r+')';
}
MapTile.prototype.texture = function(){
  return textureManager.textures['mapTile'][this.type];
}

MapTile.prototype.movementCost = function(){
  return (this.water ? 10 : 1);
}

MapTile.prototype.getState = function(){
  if (this.unit !== null && this.building !== null) return (this.parent.superiorSideTile ? this. unit : this.building);
  if (this.unit !== null) return this.unit;
  if (this.building !== null) return this.building;
  return null;
}

MapTile.prototype.centerView = function() {this.parent.centerView(this.pos.x, this.pos.y);};

export default MapTile;

