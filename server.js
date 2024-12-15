const express = require('express');
const cors = require('cors')
const path = require('path');
require('dotenv').config()
const { upload } = require('./middlewares/uploadFiles')
const connectDB = require('./configs/db');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();


const authenticateToken = require('./middlewares/auth');


// Middleware
app.use(cors());
app.use(express.json());
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRouter = require('./routes/auth.route')
const vehicleRouter = require('./routes/vehicle.route')

app.use("/auth", authRouter);
// Apply the authentication middleware to all routes under /vehicle
app.use("/vehicle", authenticateToken, upload.array('images', 10), vehicleRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})



