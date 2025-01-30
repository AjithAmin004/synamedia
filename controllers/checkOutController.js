const Room = require("../models/roomModel");
const Booking = require("../models/bookingModel");

module.exports.doCheckOuts = async function () {
    try {
        const bookings = await Booking.find({ checkOutDate: { $lt: Date.now() } });

        for (const booking of bookings) {

            const room = await Room.findOne({ roomNumber: booking.roomNumber });
            await booking.deleteOne({contact:booking.mail});
            if (room) {
                room.available = true; 
                await room.deleteOne({roomNumber:booking.roomNumber})
            }
        }
    } catch (error) {
        console.error("Error during checkout processing:", error);
    }
};
