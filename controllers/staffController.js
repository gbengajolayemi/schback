

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Staff');

const login = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
  if (!user) return res.status(400).send({ message: 'Invalid email or username' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send({ message: 'Invalid password' });

  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.send({ token });
};

const register = async (req, res) => {
  const { email, username, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) return res.status(400).send({ message: 'Email or Username already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, username, password: hashedPassword });
  await user.save();
  res.status(201).send({ message: 'User registered successfully' });
};

module.exports = { login, register };
