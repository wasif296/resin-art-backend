const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

// 1. Saara data mangwane ke liye (GET)
router.get('/', async (req, res) => {
    try {
        const records = await Record.find().sort({ createdAt: -1 });
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Naya record (Sale ya Purchase) add karne ke liye (POST)
router.post('/', async (req, res) => {
    const record = new Record(req.body);
    try {
        const newRecord = await record.save();
        res.status(201).json(newRecord);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. Delete karne ke liye
router.delete('/:id', async (req, res) => {
    try {
        await Record.findByIdAndDelete(req.params.id);
        res.json({ message: 'Record Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// --- UPDATE RECORD (Edit Logic) ---
router.put('/:id', async (req, res) => {
    try {
        // findByIdAndUpdate database mein us ID ko dhund kar naye data se badal dega
        const updatedRecord = await Record.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Is se naya wala data response mein wapis milega
        );

        if (!updatedRecord) {
            return res.status(404).json({ message: "Record not found!" });
        }

        res.json(updatedRecord);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // .env se credentials utha kar match karein
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        res.status(200).json({ message: "Login Success", success: true });
    } else {
        res.status(401).json({ message: "wrong Email or Password!", success: false });
    }
});


module.exports = router;