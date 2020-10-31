import userResources from '../userResources.js';

const unitManager = {
  list : {
    robot : []
  }
}

unitManager.unitsWaiting = () => unitManager.list.robot.filter(e => e.isWaiting());

unitManager.addRobot = function(robot){
  unitManager.list['robot'].push(robot);
  userResources.resources.construction++;
}

unitManager.reset = function(){
  unitManager.list.robot = [];
}

export default unitManager;

