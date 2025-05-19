import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoutes.js';

// App config
const app = express();
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Debug logger
app.use((req, res, next) => {
    console.log("\n#*************#");
    console.log("req url:", req.originalUrl);
    console.log("#*************#\n");
    next();
});

// API Routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

// Default route
app.get('/', (req, res) => {
    res.send('API WORKING');
});

// Start server
app.listen(port, () => console.log("Server started on port", port));
