const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Aik baar yahan kaafi hai
const dotenv = require('dotenv');
const morgan = require('morgan');
const recordRoutes = require('./routes/recordRoutes');

dotenv.config();
const app = express();

// Middlewares
app.use(cors()); // CORS permission
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