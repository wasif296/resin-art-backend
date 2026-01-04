const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const recordRoutes = require('./routes/recordRoutes');

dotenv.config();
const app = express();

// --- 1. MUKAMMAL CORS FIX (MANUAL MIDDLEWARE) ---
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Har jagah se allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Pre-flight requests (OPTIONS) ko foran 200 OK bhej do
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use(express.json()); 
app.use(morgan('dev'));

// --- 2. ROUTES ---
app.use('/api/records', recordRoutes);

// --- 3. DATABASE ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Resin Art Database Connected!"))
    .catch((err) => console.log("❌ DB Error:", err));

// Vercel ke liye zaroori hai
app.get('/', (req, res) => res.send("MOBILE CITY BACKEND IS LIVE!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on: http://localhost:${PORT}`);
});

module.exports = app;