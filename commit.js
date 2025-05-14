const fs = require("fs");
const path = require("path");
const crypto = require("crypto"); //crytography, used to create a hash of the file content, act as unique ID for each commit.

const gitDir = path.join(process.cwd(), ".mygit");

const commit = () => {
  const indexPath = path.join(gitDir, "index");
  if (!fs.existsSync(indexPath)) {
    return console.log("Nothing to commit!");
  } // checks for changes in file

  const content = fs.readFileSync(indexPath, "utf8");
  const hash = crypto
    .createHash("sha1") //create a hash (unique ID)
    .update(content + Date.now()) //add timestamp to hash
    .digest("hex"); // produces hash
  const commitPath = path.join(gitDir, "commits", hash);
  fs.writeFileSync(commitPath, content); // write file content into commit file
  fs.writeFileSync(path.join(gitDir, "HEAD"), hash); //head file stores latest commit hash
  console.log(`Committed as ${hash}`);
};

commit();
