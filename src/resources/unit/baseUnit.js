import texts		from '../../globals/texts.js';
import MapPoint2d	from '../../neuron/physics/mapPoint2d.js';
import textureManager	from '../../neuron/textureManager.js';
import AI		from '../../neuron/ai/ai.js';

function BaseUnit(city){
	this.city = city;
	this.state = 'WAIT';
	this.goal = null;
  this.worldMap = city.parent.parent;
	this.pos = new MapPoint2d(city.parent.pos.x, city.parent.pos.y, this.worldMap);
	this.route = null;
	this.remainingMoves = this.moveRange;
}

BaseUnit.prototype.type = null;
BaseUnit.prototype.moveRange = 1;

BaseUnit.prototype.refresh = function() {
	this.remainingMoves = this.moveRange;
}

BaseUnit.prototype.text = function(){
	return texts.getText('units', this.type);
}

BaseUnit.prototype.texture = function(){
	return textureManager.textures['userResources'][this.type];
}

BaseUnit.prototype.isWaiting = function(){
  if (this.state == 'MOVE') {
			this.move();
	}
	return this.state == 'WAIT' && this.remainingMoves > 0;
}

BaseUnit.prototype.goTo = function(pos){
	this.goal = new MapPoint2d(pos.x, pos.y, this.worldMap);
	this.state = 'MOVE';

	this.route = AI.path.find(this).reverse();
	this.move();
}

BaseUnit.prototype.move = function(){
	if (this.route == null) return;

	var moves = (this.remainingMoves < this.route.length ? this.remainingMoves : this.route.length);
	this.route = this.route.slice(moves);
	this.pos = this.route[0];

  if (this.pos.equals(this.goal)) {
			this.state = 'WAIT';
	}
}

export default BaseUnit;

const states = {
	'WAIT':{id:0},
	'SLEEP':{id:1},
	'MOVE':{id:2}
};

