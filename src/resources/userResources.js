import naturalResourceManager	from './naturalResourceManager.js';

function UserResources(){
	var resources = [];
	resources['robots'] = 0;
	for (var res in naturalResourceManager.resources){
		resources[res] = 0;
	}
	this.resources = resources;
}

export default UserResources;

