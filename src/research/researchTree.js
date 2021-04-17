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
  parents: [mineralTechnology, robotsTechnology]
}

researchTree.root = firstTechnology;
researchTree.end = finalTechnology;

//////////////// Configure the tree ////////////////

let endTree = researchTree.end;
endTree.children = [];
let pending = [endTree];
let visited = [];
let current, idx, parent;

while (pending.length > 0) {
  current = pending.shift();

  for (idx in current.parents) {
    parent = current.parents[idx];

    if (!visited.includes(parent)) pending.push(parent);
    if (!parent.children) parent.children = [];
    parent.children.push(current);
  }

  visited.push(current);
}

