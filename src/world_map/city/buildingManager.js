const buildingManager = {
  buildings : {
    'ROBOT_FACTORY' : {
      constructionCost : 1000,
      produces : {robots : 1},
      productionCost : 1500,
      robotsNeeded : 2
    },
    'FISH_TANK': {
      constructionCost : 200,
      produces : {food: 10},
      productionCost : 400,
      robotsNeeded : 1,
      specialResources : {
        need : 'SEALIFE',
      }
    }/*,
    '': {
      constructionCost : 1000,
      produces : {: },
      productionCost : 1500,
      robotsNeeded : 1
    }*/
  }
}

export default buildingManager;

