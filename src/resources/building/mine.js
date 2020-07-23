// @TODO: Add a base building that extends from BaseState
function Mine(worldMap, pos){
  this.worldMap = worldMap;
  this.pos = pos;
  this.level = 1;
}

Mine.prototype.getResources = function() {
  return {MINERAL:this.level * 10};
}

export default Mine;
