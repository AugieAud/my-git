const fs = require("fs"); // (file system module) built in node.js module that allows us to interact with the file system. use fs to create and write files
const path = require("path"); //(path module) built in node.js module allowing us to join directory paths makes sure code works across different operating systems

const init = () => {
  const gitDir = path.join(process.cwd(), ".mygit"); //combines parts of file path into complete path
  if (!fs.existsSync(gitDir)) {
    //checks to see if .mygit already exists
    fs.mkdirSync(gitDir);
    fs.mkdirSync(path.join(gitDir, "commits")); //create two folders .mygit the root, and .mygit/commits for commit snapshots
    fs.writeFileSync(path.join(gitDir, "HEAD"), ""); // creates and empty head file inside .mygit/, stores cureent commit reference
    console.log("Initialised empty MyGit repository");
  } else {
    console.log("MyGit repo already initialised");
  }
};

init();
