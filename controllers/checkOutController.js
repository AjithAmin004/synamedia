const Room = require("../models/roomModel");
const Booking = require("../models/bookingModel")
module.exports.doCheckOuts = function () {
    Booking.findOneAndDelete({ checkOutDate: { $lt: Date.now() } }).then(async (booking) => {
        if (booking) {
            const room = await Room.findOne({ roomNumber: booking.roomNumber });
            room.available = true;
            await room.save();
        }
    })
}