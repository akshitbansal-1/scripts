const path = require('path');

// Mapping commands to their implementation files
const commands = {
    'check-uncommitted-files': require('./commands/checkUncommittedFiles.js'),
};

// Entry point
function main() {
    const [command, directoryPath] = process.argv.slice(2);

    if (!command || !directoryPath) {
        console.error('Usage: node index.js <command> <directory_path>');
        console.error('Available commands: check-uncommitted-files');
        process.exit(1);
    }

    const commandFunc = commands[command];

    if (!commandFunc) {
        console.error(`Unknown command: ${command}`);
        console.error('Available commands: check-uncommitted-files');
        process.exit(1);
    }

    // Execute the command
    try {
        commandFunc(path.resolve(directoryPath));
    } catch (error) {
        console.error(`Error executing command "${command}":`, error.message);
        process.exit(1);
    }
}

main();
