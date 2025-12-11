require('dotenv').config();
const express = require('express');
const cors = require('cors');
const submitHandler = require('./api/submit');

const app = express();
const PORT = 3000;

// Middleware
// app.use(cors()); // DISABLED: API function handles CORS. Avoiding duplicate headers.
app.use(express.json());
app.use(express.static('.')); // Serve static files from root

// API Routes
// Wrap the async Vercel function to handle Express response methods if needed,
// but req/res should be compatible enough for this simple usage.
app.all('/api/submit', async (req, res) => {
    try {
        await submitHandler(req, res);
    } catch (error) {
        console.error('Handler Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Handler Error' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
