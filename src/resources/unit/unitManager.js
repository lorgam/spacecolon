import unitFactory	from './unitFactory.js';
import userResources	from '../userResources.js';

const unitManager = {
	factory : unitFactory,
	list : {
		robot : []
	}
}

unitManager.addRobot = function(city){
	unitManager.list['robot'].push(unitFactory['robot'](city));
	userResources.resources.robots++;
}

export default unitManager;

