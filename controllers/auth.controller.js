const { User } = require('../models/user.model.js');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return errorHandler(404, 'User not found')
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return errorHandler(401, 'Invalid Password'); 
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};

module.exports = { signin, signout, signup };
// module.exports = { signout };
// module.exports = { signup };
