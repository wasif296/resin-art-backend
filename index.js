const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const recordRoutes = require('./routes/recordRoutes');

dotenv.config();
const app = express();

// --- 1. CORS CONFIGURATION (Sab se upar) ---
app.use(cors({
    origin: "*", // Testing ke liye sab allow karein
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    credentials: true
}));

app.use(express.json()); 
app.use(morgan('dev'));

// --- 2. ROUTES ---
app.use('/api/records', recordRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Resin Art Database Connected!"))
    .catch((err) => console.log("❌ DB Error:", err.message));

// Status check
app.get('/', (req, res) => res.status(200).send("API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;