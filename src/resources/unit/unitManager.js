import unitFactory from './unitFactory.js';
import userResources from '../userResources.js';

const unitManager = {
  factory : unitFactory,
  list : {
    robot : []
  }
}

unitManager.unitsWaiting = () => unitManager.list.robot.filter(e => e.isWaiting());

unitManager.addRobot = function(city){
  var robot = unitFactory['robot'](city);
  unitManager.list['robot'].push(robot);
  userResources.resources.robots++;

  city.parent.unit = robot;
}

unitManager.reset = function(){
  unitManager.list.robot = [];
}

export default unitManager;

