const express = require('express');
const dotenv = require('dotenv').config();
const nodeCron = require('node-cron');
const app = express();
const bookingRoute = require('./routes/bookingRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const { doCheckOuts } = require('./controllers/checkOutController')

const PORT = process.env.PORT || 8000;

connectDb();
nodeCron.schedule('0 0 * * * *', doCheckOuts)
app.use(express.json());
app.use("/book", bookingRoute)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})

//check async handler middlware n cron job