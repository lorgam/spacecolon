import baseResourceManager from './baseResourceManager.js';

const naturalResourceManager = {
  resources : {
    MINERAL   : {
      color:"#DC444F",
      text:"mineral",
      default:100,
      proportion:0.0075,
      terrain:['grass','grassMountain','forest']
    },
    GAS   : {
      color:"#CB8F1E",
      text:"gas",
      default:10,
      proportion:0.005,
      terrain:['deepOcean','ocean']
    },
    GRASSLIFE : {
      color:"#5774AA",
      text:"hervibore",
      default:25,
      proportion:0.005,
      terrain:['grass','grassMountain','forest']
    },
    SEALIFE   : {
      color:"#FFF",
      text:"fish",
      default:50,
      proportion:0.0075,
      terrain:['deepOcean','ocean']
    }
  }
}

naturalResourceManager.generateResources = function(worldMap){
  var name, res;
  for (name in naturalResourceManager.resources){
    res = naturalResourceManager.resources[name];
    baseResourceManager.generateResource(worldMap, naturalResourceManager, 'naturalResources', name, res.terrain, res.proportion);
  }
}

export default naturalResourceManager;

