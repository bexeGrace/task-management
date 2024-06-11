const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user")

const router = express.Router();


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password.");
  
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).send("Invalid email or password.");
  
    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      "jwtPrivateKey"
    );
    res.send(token);
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