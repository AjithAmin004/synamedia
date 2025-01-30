const Room = require("../models/roomModel");
const Booking = require("../models/bookingModel")
const asyncHandler = require("express-async-handler");
const { z } = require('zod');

function getStayDuration(checkInDate, checkOutDate) {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const duration = (checkOut - checkIn) / (1000 * 3600 * 24);
    return duration;
}

const bookingSchema = z.object({
    name: z.string({ message: "Please provide String Vlaue" }).min(3),
    mail: z.string({ message: "Please provide a string value" }).email({ message: "Please provide a valid email address" }),
    checkInDate: z.date({ message: "Please provide a valid date" }),
    checkOutDate: z.date({ message: "Please provide a valid date" }),
});

const modifyBookingSchema = z.object({
    mail: z.string({ message: "Please provide a string value" }).email({ message: "Please provide a valid email address" }),
    newCheckInDate: z.date({ message: "Please provide a valid date" }),
    newCheckOutDate: z.date({ message: "Please provide a valid date" }),
});

module.exports.bookRoom = asyncHandler(async (req, res) => {
    try {
        let { name, mail, checkInDate, checkOutDate } = req.body;
        checkInDate = new Date(checkInDate)
        checkOutDate = new Date(checkOutDate)
        const date = new Date(Date.UTC(2025, 0, 30)).toISOString();
        if (checkOutDate < checkInDate || checkOutDate < date|| checkInDate < date) {
            return res.status(400).json({ message: 'Please provide valid dates' })
        }
        bookingSchema.parse({ name, mail, checkInDate, checkOutDate });
        const alreadyBooked = await Booking.findOne({ contact: mail });
        if (alreadyBooked) {
            return res.status(200).json({ message: 'Room already Booked', alreadyBooked });
        }
        const availableRoom = await Room.findOne({ available: true });

        if (!availableRoom) {
            return res.status(400).json({ message: 'No rooms available' });
        }

        availableRoom.available = false;
        await availableRoom.save();

        const stayDuration = getStayDuration(checkInDate, checkOutDate);

        const booking = new Booking({
            name,
            contact: mail,
            checkInDate,
            checkOutDate,
            roomNumber: availableRoom.roomNumber,
            stayDuration
        });

        await booking.save();

        res.status(201).json({ message: 'Room Booked', booking });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error', error });
    }
});

module.exports.viewRoom = asyncHandler(async (req, res) => {
    try {
        const { mail } = req.query

        const booking = await Booking.findOne({ contact: mail });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error', error });
    }
});

module.exports.viewAllGuest = asyncHandler(async (req, res) => {
    try {
        const guestList = await Booking.find()

        res.json(guestList);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error', error });
    }
});

module.exports.cancelBooking = asyncHandler(async (req, res) => {
    const { mail } = req.body;

    try {
        const booking = await Booking.findOne({ contact: mail });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.checkOutDate < Date.now()) {
            return res.status(400).json({ message: 'Booking already checked out' })
        };

        const room = await Room.findOne({ roomNumber: booking.roomNumber });
        room.available = true;
        await room.save();

        await booking.remove();

        res.json({ message: 'Booking canceled successfully', canceledBooking: booking });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error', error });
    }
});

module.exports.modifyBooking = asyncHandler(async (req, res) => {
    try {
        let { mail, newCheckInDate, newCheckOutDate } = req.body;
        newCheckInDate = new Date(newCheckInDate)
        newCheckOutDate = new Date(newCheckOutDate)
        modifyBookingSchema.parse({ mail, newCheckInDate, newCheckOutDate });

        const date = new Date(Date.UTC(2025, 0, 30)).toISOString();

        if (newCheckOutDate < newCheckInDate || newCheckOutDate < date || newCheckInDate < date) {
            return res.status(400).json({ message: 'Please provide valid dates' })
        }

        const booking = await Booking.findOne({ contact: mail });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.checkInDate = newCheckInDate;
        booking.checkOutDate = newCheckOutDate;
        booking.stayDuration = getStayDuration(newCheckInDate, newCheckOutDate);

        await booking.save();

        res.json({ message: 'Booking modified successfully', booking });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error', error });
    }
});