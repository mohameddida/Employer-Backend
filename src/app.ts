import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db';
import employeeRoutes from './routes/employerRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/employers', employeeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
