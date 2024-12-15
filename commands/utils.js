const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Function to find all subdirectories with .git folders
function findGitDirectories(rootDir) {
  return fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(rootDir, entry.name))
    .filter((dir) => fs.existsSync(path.join(dir, ".git"))); // Check if .git folder exists
}

// Function to check if a directory contains uncommitted files
function hasUncommittedFiles(dir) {
  try {
    // Run 'git status --porcelain' to check for uncommitted changes
    const result = execSync("git status --porcelain", {
      cwd: dir,
      encoding: "utf8",
    });
    return result.trim().length > 0; // If there's output, there are uncommitted changes
  } catch (error) {
    console.error(`Error checking directory ${dir}: ${error.message}`);
    return false;
  }
}

module.exports = {
  findGitDirectories,
  hasUncommittedFiles,
};
