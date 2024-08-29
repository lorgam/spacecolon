const researchTree = {
  iconSize: 50,
  techPerLevel: []
}

researchTree.reset = () => {
  let pending = [researchTree.root];
  let visited = [];
  let current, i, child;

  while (pending.length > 0) {
    current = pending.shift();
    current.completion = 0;

    for (i in current.children) {
      child = current.children[i];
      if (!visited.includes(child)) pending.push(child);
    }

    visited.push(current);
  }
}

researchTree.maxWidth = () => Math.max(...researchTree.techPerLevel) + 1;

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

const finalTechnology = {
  name: "final_technology",
  cost: 100,
  completed: () => {console.log("final technology", this);},
  parents: [advancedmineralTechnology, robotsTechnology],
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
let current, idx, parent;

while (pending.length > 0) {
  current = pending.shift();

  for (idx in current.parents) {
    parent = current.parents[idx];

    if (!parent.children) {
      parent.children = [current];
      parent.level = current.level + 1;

      pending.push(parent);
    } else {
      parent.children.push(current);
      if (parent.level < current.level + 1) parent.level = current.level + 1;
    }
  }
}

researchTree.techPerLevel = Array(researchTree.root.level + 1).fill(0);

pending = [researchTree.root];
let visited = [], child;

while (pending.length > 0) {
  current = pending.shift();
  visited.push(current);

  current.levelPos = researchTree.techPerLevel[current.level]++;

  for (idx in current.children) {
    child = current.children[idx];
    if (!visited.includes(child) && !pending.includes(child)) pending.push(child);
  }
}

