const express = require("express");
const {
    bookRoom, viewRoom, viewAllGuest, cancelBooking, modifyBooking
} = require("../controllers/bookingController");
const router = express.Router();

router.route("/").post(bookRoom).get(viewRoom).delete(cancelBooking).put(modifyBooking)

router.route("/viewGuests").get(viewAllGuest);

module.exports = router;