import unitManager  from '../resources/unit/unitManager.js';

const turnManager = {
  turn : 0,
  screen : null
};

turnManager.advance = function(){
  // @TODO: Process the buildings
  var unitsWaiting = unitManager.unitsWaiting();
  if (unitsWaiting.length) unitsWaiting[0].worldMap.nextState = unitsWaiting[0];
  else {
      turnManager.turn++;
      for (let i = 0; i < unitManager.list.robot.length; ++i) {
          unitManager.list.robot[i].refresh();
      }
  }
}

turnManager.init = function(){
  turnManager.turn = 0;
}

turnManager.reset = function(screen){
  turnManager.turn = 0;
  turnManager.screen = screen;
}

export default turnManager;

