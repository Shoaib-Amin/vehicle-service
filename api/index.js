// const express = require('express');
// const cors = require('cors')
// const path = require('path');
// const serverless = require('serverless-http');
// require('dotenv').config()
// const { upload } = require('../middlewares/uploadFiles')
// const connectDB = require('../configs/db');

// const app = express();

// // Connect to MongoDB
// connectDB();


// const authenticateToken = require('../middlewares/auth');


// // Middleware
// app.use(cors());
// app.use(express.json());
// // Serve static files from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const authRouter = require('../routes/auth.route')
// const vehicleRouter = require('../routes/vehicle.route')

// app.use("/auth", authRouter);
// // Apply the authentication middleware to all routes under /vehicle
// app.use("/vehicle", authenticateToken, upload.array('images', 10), vehicleRouter);



// module.exports.handler = serverless(app);



const express = require('express');
const app = express();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello from Express app!');
});

// Export the app to be used by Vercel
module.exports = (req, res) => {
  app(req, res); // Pass the request and response to your Express app
};
