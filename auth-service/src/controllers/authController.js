const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    console.log(user)
    await user.save();
    // console.log(user)
    res.status(201).send({ message: 'User registered successfully' ,data:user});
  } catch (error) {
    res.status(400).send({ error: 'Error registering user' });
  }
}; 

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: 'Error logging in' });
  }
};
