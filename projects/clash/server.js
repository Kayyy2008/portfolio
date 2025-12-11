const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API Token
const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjNmZjQ3MTY5LWJlYjgtNDIyMi04YjkyLTk1YTFkYzQzZjZlNSIsImlhdCI6MTc2NTQ0ODMxNSwic3ViIjoiZGV2ZWxvcGVyLzBiNmI4MTgyLTJhZTgtZjI3NC03MDEyLWM3ZDQ1OThjYjE5NiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI5My45NS4yNTEuMjIiXSwidHlwZSI6ImNsaWVudCJ9XX0.1ggZddcai85-07br_8SgtxeoWbu0HyUrF9X93FJuhyfneaV0k-esK6tJ9iaqbhny6AE8_tcT33Kv4yg8y8EDQw';
const API_BASE_URL = 'https://api.clashroyale.com/v1';

// Proxy routes
app.get('/api/players/:tag', async (req, res) => {
    try {
        const tag = encodeURIComponent(req.params.tag);
        const response = await fetch(`${API_BASE_URL}/players/${tag}`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/cards', async (req, res) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cards`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
