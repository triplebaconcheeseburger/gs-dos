const path = require('path');
const fs = require('fs');

const decryptFile = (req, res) => {
    const fileName = req.query.file;
    const filePath = path.join(__dirname, '../public/music', fileName);

    // Dummy decryption logic (you'd replace this with actual decryption)
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('File not found');
    }
};

module.exports = {
    decryptFile
};