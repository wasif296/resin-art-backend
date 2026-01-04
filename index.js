const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const recordRoutes = require('./routes/recordRoutes');

dotenv.config();
const app = express();

// --- 1. FULL CORS BYPASS (Place this at the very top) ---
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Har jagah se allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }
    next();
});

app.use(express.json()); 
app.use(morgan('dev'));

// --- 2. ROUTES ---
app.use('/api/records', recordRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Resin Art Database Connected!"))
    .catch((err) => console.log("❌ DB Error:", err));

// Root route (Checking backend status)
app.get('/', (req, res) => res.send("MOBILE CITY BACKEND IS LIVE!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on: http://localhost:${PORT}`);
});

module.exports = app;