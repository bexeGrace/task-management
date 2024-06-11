const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const Task = require("../models/task")

const router = express.Router();

//! GET, POST => USERS
router.post("/users", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).send("Username already taken.");

  const user = new User({
    username,
    password: await bcrypt.hash(password, 10),
  });

  await user.save();

  res.send(user);
});

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

module.exports = router;
