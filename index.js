const fs = require("fs"); // Node.js built-in module for interacting with the file system (read/write files, create folders)
const path = require("path"); // Node.js built-in module for handling file paths in a cross-platform way

const init = () => {
  // Define the path to the hidden .mygit folder inside the current working directory
  const gitDir = path.join(process.cwd(), ".mygit");

  // If .mygit doesn't already exist (i.e. not initialized yet)
  if (!fs.existsSync(gitDir)) {
    // Create the .mygit directory — acts like Git's hidden .git folder
    fs.mkdirSync(gitDir);

    // Create a commits folder inside .mygit to store commit snapshots (e.g., as files or folders)
    fs.mkdirSync(path.join(gitDir, "commits"));

    // Create the HEAD file and initialize it to point to the main branch
    // HEAD tells us what the current branch is (like "main" or "dev")
    fs.writeFileSync(path.join(gitDir, "HEAD"), "main");

    // Initialize branches.json with a single "main" branch, currently pointing to `null` (i.e. no commits yet)
    // This acts like Git's `refs/heads` directory, storing what each branch points to
    fs.writeFileSync(
      path.join(gitDir, "branches.json"),
      JSON.stringify({ main: null }, null, 2) // nicely formatted for readability
    );

    console.log("Initialised empty MyGit repository");
  } else {
    // If already initialized, print a message
    console.log("MyGit repo already initialised");
  }
};

// Run the init function when this script is executed
init();
