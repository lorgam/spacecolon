const researchTree = {}

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

export default researchTree;

//////////////// Individual technologies ////////////////

const firstTechnology = {
  name: "initial_technology",
  cost: 10,
  completed: () => {console.log("first technology", this);},
  parents: []
}

const mineralTechnology = {
  name: "mineral_technology",
  cost: 20,
  completed: () => {console.log("mineral technology", this);},
  parents: [firstTechnology]
}

const advancedmineralTechnology = {
  name: "adv_mineral_technology",
  cost: 50,
  completed: () => {console.log("advanced mineral technology", this);},
  parents: [mineralTechnology]
}

const robotsTechnology = {
  name: "robots_technology",
  cost: 50,
  completed: () => {console.log("robots technology", this);},
  parents: [firstTechnology]
}

const finalTechnology = {
  name: "final_technology",
  cost: 100,
  completed: () => {console.log("final technology", this);},
  parents: [advancedmineralTechnology, robotsTechnology]
}

researchTree.root = firstTechnology;
researchTree.end = finalTechnology;

//////////////// Configure the tree ////////////////

let endTree = researchTree.end;
endTree.children = [];
endTree.level = 0; // Maximum generations till the end, useful for positioning the nodes
let pending = [endTree];
let current, idx, parent, pos;

while (pending.length > 0) {
  current = pending.shift();

  for (idx in current.parents) {
    parent = current.parents[idx];
    pos = current.position + 1;

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

let texPerLevel = []; //Number of technologies per level
for (idx = 0; idx <= researchTree.root.level; idx++) texPerLevel[idx] = 0;

pending = [researchTree.root];
let visited = [], child;

while (pending.length > 0) {
  current = pending.shift();
  visited.push(current);

  current.levelPos = texPerLevel[current.level]++;

  for (idx in current.children) {
    child = current.children[idx];
    if (!visited.includes(child) && !pending.includes(child)) pending.push(child);
  }
}

