const express = require('express');
const { signin, signup, signout } = require('../controllers/auth.controller.js');

const authRoutes = express.Router();

authRoutes.post('/signup', signup);
authRoutes.post('/signin', signin);
authRoutes.get('/signout', signout);

module.exports = { authRoutes };
