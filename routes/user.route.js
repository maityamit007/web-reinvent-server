const express = require('express');
let userRouter = express.Router();

const { test } = require('../controllers/user.controller.js');
userRouter.get('/', test);


module.exports = { userRouter };