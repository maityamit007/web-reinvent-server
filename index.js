// import authRoutes from './routes/auth.route.js';
// import path from 'path';
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { userRouter } = require('./routes/user.route.js');
const { authRoutes } = require('./routes/auth.route.js');

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log("Caused an error though my man",err);
  });

// const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRoutes);
// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

app.listen(3000, () => {
  console.log('Server running on port 3000!');
});

// app.use('/api/auth', authRoutes);

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   return res.status(statusCode).json({
//     success: false,
//     message,
//     statusCode,
//   });
// });
