const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    type: { type: String, enum: ['Sale', 'Purchase'], required: true }, // Sale hai ya Purchase
    date: { type: String, required: true },
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    // Sirf Sales ke liye:
    customerName: { type: String },
    customerPhone: { type: String },
    deliveryAddress: { type: String },
    profit: { type: Number, default: 0 } // Ye field bill par hide hogi magar yahan save hogi
}, { timestamps: true });

module.exports = mongoose.model('Record', RecordSchema);