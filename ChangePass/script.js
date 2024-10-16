const { exec } = require('child_process');

function runCommand(command) {
    exec(command, () => {
        
    });
}

runCommand('start cmd /k control userpasswords2');
