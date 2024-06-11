const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user")

const router = express.Router();


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password.');
    }

    // Compare provided password with stored password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send('Invalid email or password.');
    }

    // Sign the JWT
    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      'thisismykey',
      { expiresIn: '1h' } // Optional: Add token expiration
    );

    // Send the token as a response
    res.send({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal server error.');
  }
});
  router.post("/register", async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
  
    // Check if the email is already registered
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already registered.");
  
    // Create a new user
    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      isAdmin,
    });
  
    await user.save();
  
    // Send a response with the new user
    res.send(user);
  });

  module.exports = router;