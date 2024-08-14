const terminalInput = document.querySelector('#terminal-input');
const terminalPrompt = document.querySelector('#terminal-prompt');

// Initialize the command map
const terminalCommands = {
    ls: () => {
        fetch('/ls')
            .then(response => response.json())
            .then(files => {
                const listOutput = document.createElement('p');
                listOutput.textContent = files.join('\n');
                appendOutput(listOutput);
            })
            .catch(error => {
                const errorOutput = document.createElement('p');
                errorOutput.textContent = 'Error: Unable to list directory contents';
                appendOutput(errorOutput);
            });
    },
    cd: (args) => {
        const targetDir = args[0] || '';

        fetch('/cd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dir: targetDir })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updatePrompt(data.currentDirectory); // Update the prompt with the new directory
                const cdOutput = document.createElement('p');
                cdOutput.textContent = `Directory changed to ${data.currentDirectory}`;
                appendOutput(cdOutput);
            } else {
                const errorOutput = document.createElement('p');
                errorOutput.textContent = 'Error: Directory not found';
                appendOutput(errorOutput);
            }
        })
        .catch(error => {
            const errorOutput = document.createElement('p');
            errorOutput.textContent = 'Error: Unable to change directory';
            appendOutput(errorOutput);
        });
    },
    help: () => {
        fetch('/help')
            .then(response => response.json())
            .then(data => {
                const helpOutput = document.createElement('pre');
                helpOutput.textContent = data.helpText;
                appendOutput(helpOutput);
            })
            .catch(error => {
                const errorOutput = document.createElement('p');
                errorOutput.textContent = 'Error: Unable to display help';
                appendOutput(errorOutput);
            });
    },
    // Add more commands here as needed
};

// Utility function to append output to the terminal
function appendOutput(element) {
    const outputDiv = document.querySelector('#terminal-output');
    outputDiv.appendChild(element);
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

// Function to update the terminal prompt with the current directory
function updatePrompt(currentDirectory) {
    terminalPrompt.textContent = `user@secret:${currentDirectory}$`;
}

// Event listener for the terminal input
document.querySelector('#terminal-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const input = e.target.value.trim();
        const outputDiv = document.querySelector('#terminal-output');
        const newOutput = document.createElement('p');

        // Echo the command
        const [command, ...args] = input.split(' ');
        newOutput.textContent = `${terminalPrompt.textContent} ${input}`;
        outputDiv.appendChild(newOutput);

        // Execute the corresponding command
        if (terminalCommands[command]) {
            terminalCommands[command](args);
        } else {
            const errorOutput = document.createElement('p');
            errorOutput.textContent = `Command not found: ${command}`;
            appendOutput(errorOutput);
        }

        // Clear the input field
        e.target.value = '';

        // Scroll to the bottom of the output
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }
});

// Initialize the prompt with the default directory
updatePrompt('~');
