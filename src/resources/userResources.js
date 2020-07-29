import naturalResourceManager from './naturalResourceManager.js';

const userResources = {
  resources : {}
}

userResources.init = () => {userResources.resources = userResources.getResourcesObject();}

userResources.getResourcesObject = () => {
  let obj = {'construction':0};
  for (var res in naturalResourceManager.resources) obj[res] = 0;
  return obj;
}

export default userResources;

