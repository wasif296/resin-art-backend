const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Aik baar yahan kaafi hai
const dotenv = require('dotenv');
const morgan = require('morgan');
const recordRoutes = require('./routes/recordRoutes');

dotenv.config();
const app = express();

// Middlewares
// index.js mein purana cors hata kar ye likhein:
app.use(cors({
    origin: "*", // Is se har jagah se access allow ho jayega
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json()); 
app.use(morgan('dev'));

// Routes
app.use('/api/records', recordRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Resin Art Database Connected!"))
    .catch((err) => console.log("❌ DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on: http://localhost:${PORT}`);
});
module.exports = app;