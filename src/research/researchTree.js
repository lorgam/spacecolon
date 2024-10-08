const researchTree = {
  iconSize: 50,
  techPerLevel: [],
  maxWidth: 0
}

researchTree.applyFunctionToAll = function(f) {
  var pending = [researchTree.root], visited = [];
  while (pending.length > 0) {
    let current = pending.shift();
    let result = f(current);
    if (typeof result !== "undefined") return result;
    current.children.forEach(child => {if (!visited.includes(child) && !pending.includes(child)) pending.push(child);});
    visited.push(current);
  }
}

researchTree.reset = () => researchTree.applyFunctionToAll(node => {node.completion = 0;})

export default researchTree;

//////////////// Individual technologies ////////////////

const firstTechnology = {
  name: "initial_technology",
  cost: 10,
  completed: () => {console.log("first technology", this);},
  parents: [],
  icon: {
    type: "star",
    sides: 4,
    color: "#F00"
  }
}

const mineralTechnology = {
  name: "mineral_technology",
  cost: 20,
  completed: () => {console.log("mineral technology", this);},
  parents: [firstTechnology],
  icon: {
    type: "polygon",
    sides: 3,
    color: "#F00"
  }
}

const advancedmineralTechnology = {
  name: "adv_mineral_technology",
  cost: 50,
  completed: () => {console.log("advanced mineral technology", this);},
  parents: [mineralTechnology],
  icon: {
    type: "polygon",
    sides: 6,
    color: "#FF0"
  }
}

const robotsTechnology = {
  name: "robots_technology",
  cost: 50,
  completed: () => {console.log("robots technology", this);},
  parents: [firstTechnology],
  icon: {
    type: "star",
    sides: 5,
    color: "#FF0"
  }
}

const nanoTech = {
  name: "nano_technology",
  cost: 75,
  completed: () => {console.log("nano technology", this);},
  parents: [advancedmineralTechnology, robotsTechnology],
  icon: {
    type: "star",
    sides: 10,
    color: "#FF0"
  }
}

const darkTechnology = {
  name: "dark_technology",
  cost: 75,
  completed: () => {console.log("preFinal technology", this);},
  parents: [nanoTech],
  icon: {
    type: "star",
    sides: 10,
    color: "#999"
  }
}

const ultimaTechnology = {
  name: "ultima_technology",
  cost: 75,
  completed: () => {console.log("ultima technology", this);},
  parents: [darkTechnology],
  icon: {
    type: "star",
    sides: 10,
    color: "#0FF"
  }
}

const preFinalTechnology = {
  name: "pre_final_technology",
  cost: 75,
  completed: () => {console.log("preFinal technology", this);},
  parents: [ultimaTechnology],
  icon: {
    type: "star",
    sides: 11,
    color: "#0F0"
  }
}

const finalTechnology = {
  name: "final_technology",
  cost: 100,
  completed: () => {console.log("final technology", this);},
  parents: [preFinalTechnology],
  icon: {
    type: "star",
    sides: 12,
    color: "#FFF"
  }
}

researchTree.root = firstTechnology;
researchTree.end = finalTechnology;

//////////////// Configure the tree ////////////////

let endTree = researchTree.end;
endTree.children = [];
endTree.level = 0; // Maximum generations till the end, useful for positioning the nodes
let pending = [endTree];

while (pending.length > 0) {
  let current = pending.shift();
  current.parents.forEach(parent => {
    if (!parent.children) {
      parent.children = [current];
      parent.level = current.level + 1;

    } else {
      parent.children.push(current);
      if (parent.level < current.level + 1) parent.level = current.level + 1;
    }
    if (!pending.includes(parent)) pending.push(parent);
  });
}

researchTree.techPerLevel = Array(researchTree.root.level + 1).fill(0);

researchTree.applyFunctionToAll(node => {node.levelPos = researchTree.techPerLevel[node.level]++;}); // Calculate how many techs there are per level

researchTree.maxWidth = Math.max(...researchTree.techPerLevel) + 1; // Maximum number of technologies in a level

