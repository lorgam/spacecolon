import unitFactory	from './unitFactory.js';
import userResources	from '../userResources.js';

const unitManager = {
	factory : unitFactory,
	list : {
		robot : []
	}
}

unitManager.unitsWaiting = () => unitManager.list.robot.filter(e => e.isWaiting());

unitManager.addRobot = function(city){
	unitManager.list['robot'].push(unitFactory['robot'](city));
	userResources.resources.robots++;
}

unitManager.reset = function(){
	unitManager.list.robot = [];
}

export default unitManager;

