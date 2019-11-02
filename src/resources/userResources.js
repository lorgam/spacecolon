import naturalResourceManager	from './naturalResourceManager.js';

const userResources = {
	resources : {}
}

userResources.init = function() {
	userResources.resources['robots'] = 0;
	for (var res in naturalResourceManager.resources){
		userResources.resources[res] = 0;
	}
}

export default userResources;

