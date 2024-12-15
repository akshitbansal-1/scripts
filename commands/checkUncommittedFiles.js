const { findGitDirectories, hasUncommittedFiles } = require("./utils");

function checkUncommittedFiles(directoryPath) {
  console.log(`Checking for uncommitted files in: ${directoryPath}`);

  const gitDirs = findGitDirectories(directoryPath);

  if (gitDirs.length === 0) {
    console.log("No Git repositories found in subdirectories.");
    return;
  }

  gitDirs.forEach((dir) => {
    const hasChanges = hasUncommittedFiles(dir);
    console.log(
      `${dir}: ${
        hasChanges ? "Has uncommitted changes" : "No uncommitted changes"
      }`
    );
  });
}

module.exports = checkUncommittedFiles;
