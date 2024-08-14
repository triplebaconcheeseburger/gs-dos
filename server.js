const express = require('express');
const path = require('path');
const routes = require('./server/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "src" directory
app.use(express.static(path.join(__dirname, 'src')));

// Use routes
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});
