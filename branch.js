const fs = require("fs");
const path = require("path");

const command = process.argv[2]; // e.g. "create" or "switch"
const branchName = process.argv[3]; // e.g. "feature-x"

// build paths to .mygit
const gitDir = path.join(process.cwd(), ".mygit"); //root of system
const branchesPath = path.join(gitDir, "branches.json"); //stores all branches and thei associated commit references
const headPath = path.join(gitDir, "HEAD"); //stores name of current active branch

//define function to create new branch
const createBranch = (name) => {
  const branches = JSON.parse(fs.readFileSync(branchesPath, "utf-8")); //reads existing branches from branches.json
  const currentBranch = fs.readFileSync(headPath, "utf-8"); //gets current active branch from HEAD

  if (branches[name]) {
    console.log(`Branch "${name}" already exists.`);
    return; //prevent duplicates
  }

  branches[name] = branches[currentBranch]; // create new branch at same commit as current branch
  fs.writeFileSync(branchesPath, JSON.stringify(branches, null, 2)); //save branch
  console.log(`Created branch "${name}"`);
};

//function to switch branches
const switchBranch = (name) => {
  const branches = JSON.parse(fs.readFileSync(branchesPath, "utf-8"));

  if (!(name in branches)) {
    console.log(`Branch "${name}" does not exist.`);
    return;
  }

  fs.writeFileSync(headPath, name); // save new branch in head
  console.log(`Switched to branch "${name}"`);
};

// Main handler
if (!command || !branchName) {
  console.log("Usage: node branch.js <create|switch> <branch-name>");
} else if (command === "create") {
  createBranch(branchName);
} else if (command === "switch") {
  switchBranch(branchName);
} else {
  console.log(`Unknown command: ${command}`);
}
