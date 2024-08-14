const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Set the initial current directory to the public directory
let currentDirectory = path.join(__dirname, '../public');

// Log the current directory to verify the path
console.log('Current directory:', currentDirectory);

// Helper function to resolve the current directory
const resolvePath = (dir) => {
    if (!dir || dir === '.') return currentDirectory; // Handle the case for 'ls' in the current directory
    return path.resolve(currentDirectory, dir);
};


// Serve the index.html file at the root URL
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/views/index.html'));
});

// Route for the 'ls' command
router.get('/ls', (req, res) => {
    fs.readdir(currentDirectory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err.message);
            return res.status(500).json({ error: 'Unable to list directory contents' });
        }
        res.json(files); // Send the list of files back to the frontend
    });
});

// Route for the 'cd' command
router.post('/cd', (req, res) => {
    const targetDir = req.body.dir;

    if (!targetDir) {
        return res.status(400).json({ error: 'No directory specified' });
    }

    const newDirectory = path.resolve(currentDirectory, targetDir);

    fs.stat(newDirectory, (err, stats) => {
        if (err || !stats.isDirectory()) {
            return res.status(400).json({ error: 'Directory not found' });
        }

        currentDirectory = newDirectory;
        res.json({ success: true, currentDirectory });
    });
});



// Route for decrypting and streaming music files
router.get('/decrypt', (req, res) => {
    const fileName = req.query.file;
    const filePath = path.join(currentDirectory, fileName);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('File not found');
    }
});

// Route to serve the help command
router.get('/help', (req, res) => {
    const helpFilePath = path.join(__dirname, 'README.md');
    
    fs.readFile(helpFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading help file:', err.message);
            return res.status(500).json({ error: 'Unable to read help file' });
        }
        res.json({ helpText: data });
    });
});
module.exports = router;
