const fs = require("fs");
const path = require("path");

const fileToAdd = process.argv[2]; // an array of command-line arguments, passing the third argument
const gitDir = path.join(process.cwd(), ".mygit");

const add = () => {
  if (!fileToAdd) return console.log("Specify a file to add");
  const filePath = path.join(process.cwd(), fileToAdd); //gets full path of file
  const content = fs.readFileSync(filePath, "utf8"); //reads file
  fs.writeFileSync(path.join(gitDir, "index"), content); // writes file content to index file like a "staging area"
  console.log(`Added ${fileToAdd}`);
};

add();
