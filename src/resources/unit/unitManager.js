import unitFactory from './unitFactory.js';
import userResources from '../userResources.js';

const unitManager = {
  factory : unitFactory,
  list : {
    robot : []
  }
}

unitManager.unitsWaiting = () => unitManager.list.robot.filter(e => e.isWaiting());

unitManager.addConstructionRobot = function(city){
  var robot = unitFactory['constructionRobot'](city);
  unitManager.list['robot'].push(robot);
  userResources.resources.construction++;

  city.parent.unit = robot;
}

unitManager.reset = function(){
  unitManager.list.robot = [];
}

export default unitManager;

