const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true, unique: true },
    available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Room', roomSchema);