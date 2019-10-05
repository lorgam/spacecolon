import baseResourceManager	from './baseResourceManager.js';

const naturalResourceManager = {
	resources : {
		MINERAL	: {id:1,color:"#DC444F",text:"mineral",default:100},
		GAS	: {id:2,color:"#CB8F1E",text:"gas",default:0}
	}
}

naturalResourceManager.generateResources = function(worldMap){
	baseResourceManager.generateResource(worldMap, naturalResourceManager, 'naturalResources', 'MINERAL', ['grass','grassMountain','forest'], 0.005);
	baseResourceManager.generateResource(worldMap, naturalResourceManager, 'naturalResources', 'GAS', ['deepOcean','ocean'], 0.0075);
}

export default naturalResourceManager;

