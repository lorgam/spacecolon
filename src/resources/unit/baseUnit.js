import texts		from '../../globals/texts.js';
import MapPoint2d	from '../../neuron/physics/mapPoint2d.js';
import textureManager	from '../../neuron/textureManager.js';

function BaseUnit(city){
	this.city = city;
	this.state = 'WAIT';
	this.goal = null;
	this.pos = new MapPoint2d(city.parent.pos.x, city.parent.pos.y);
}


BaseUnit.prototype.type = null;

BaseUnit.prototype.text = function(){
	return texts.getText('units', this.type);
}

BaseUnit.prototype.texture = function(){
	return textureManager.textures['userResources'][this.type];
}

BaseUnit.prototype.isWaiting = function(){
	return this.state == 'WAIT';
}

BaseUnit.prototype.goTo = function(pos){
	this.goal = pos;
	this.state = 'MOVE';
}

BaseUnit.prototype.move = function(){
}

export default BaseUnit;

const states = {
	'WAIT':{id:0},
	'SLEEP':{id:1},
	'MOVE':{id:2}
};

