const fs = require("fs");
const path = require("path");

const gitDir = path.join(process.cwd(), ".mygit");

const log = () => {
  const head = fs.readFileSync(path.join(gitDir, "HEAD"), "utf8").trim(); //reads commit history stored in HEAD
  if (!head) return console.log("No commits yet."); //checks for commits and logs appropriate message

  const content = fs.readFileSync(path.join(gitDir, "commits", head), "utf8");
  console.log(`Commit: ${head}`);
  console.log(content);
};

log();
