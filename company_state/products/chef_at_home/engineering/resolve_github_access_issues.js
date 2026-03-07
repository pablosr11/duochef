// Script to check GitHub repository settings and ensure correct URL

const { exec } = require('child_process');

function checkRepoSettings() {
    exec('git remote -v', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }
        console.log(`Repository settings: ${stdout}`);
    });
}

checkRepoSettings();