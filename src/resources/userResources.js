import naturalResourceManager from './naturalResourceManager.js';

const userResources = {
  resources : {}
}

userResources.init = () => {userResources.resources = Object.assign(userResources.getResourcesObject(), {MINERAL:1000});}

userResources.getResourcesObject = () => {
  let obj = {'construction':0};
  for (var res in naturalResourceManager.resources) obj[res] = 0;
  return obj;
}

userResources.addResources = resObj => {
    for (let i in resObj) userResources.resources[i] += resObj[i];
}

userResources.checkAvailable = resObj => {
  for (var res in resObj) if (resObj[res] > userResources.resources[res]) return false;
  return true;
}

export default userResources;

