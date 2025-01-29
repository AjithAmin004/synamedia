const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    roomNumber: { type: Number, required: true },
    stayDuration: { type: Number, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);

