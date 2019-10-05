import baseResourceManager	from './baseResourceManager.js';

const naturalResourceManager = {
	resources : {
		MINERAL		: {id:1,color:"#DC444F",text:"mineral",default:100,terrain:['grass','grassMountain','forest']},
		GAS		: {id:2,color:"#CB8F1E",text:"gas",default:10,terrain:['deepOcean','ocean']},
		GRASSLIFE	: {id:3,color:"#5774AA",text:"hervibore",default:25,terrain:['grass','grassMountain','forest']},
		SEALIFE		: {id:4,color:"#FFFFFF",text:"fish",default:50,terrain:['deepOcean','ocean']}
	}
}

naturalResourceManager.generateResources = function(worldMap){
	var name, res;
	for (name in naturalResourceManager.resources){
		res = naturalResourceManager.resources[name];
		baseResourceManager.generateResource(worldMap, naturalResourceManager, 'naturalResources', name, res.terrain, 0.005);
	}
}

export default naturalResourceManager;

