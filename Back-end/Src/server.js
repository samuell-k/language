const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('../routes/userRoutes');
const eventRoutes = require('../routes/eventRoutes');
const groupRoutes = require('../routes/groupRoutes');
const paymentRoutes = require('../routes/paymentRoutes');
const studentRoutes = require('../routes/studentRoutes');
// const teacherRoutes = require('../routes/teacherRoutes');
const Createadmin = require('../routes/Create');

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', eventRoutes);
app.use('/api', groupRoutes);
app.use('/api', paymentRoutes);
app.use('/api', studentRoutes);
// app.use('/api', teacherRoutes);
app.use('/api', Createadmin); //api/create-user

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// connect to db

const CONNECTION = process.env.CONNECTION;
const dbconnect = async () => {
  try {
    await mongoose.connect(CONNECTION);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
};

dbconnect();
