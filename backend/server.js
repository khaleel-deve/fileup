const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Set up multer for file uploads
const upload = multer({ dest: 'backend/uploads/' });

// Serve static files from the uploads directory
app.use('/uploads', express.static('backend/uploads'));

// Endpoint to upload a file
app.post('/upload', upload.single('file'), (req, res) => {
    res.send(`File uploaded: ${req.file.originalname}`);
});

// Endpoint to list uploaded files
app.get('/files', (req, res) => {
    fs.readdir('backend/uploads', (err, files) => {
        if (err) {
            return res.status(500).send('Error reading files.');
        }
        res.json(files);
    });
});

// Endpoint to download a file
app.get('/files/:filename', (req, res) => {
    const filePath = path.join('backend/uploads', req.params.filename);
    res.download(filePath);
});

// Endpoint to delete a file
app.delete('/files/:filename', (req, res) => {
    const filePath = path.join('backend/uploads', req.params.filename);
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).send('Error deleting file.');
        }
        res.send('File deleted.');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
