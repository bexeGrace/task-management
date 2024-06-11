const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require("../models/task")

const router = express.Router();

router.post("/tasks", async (req, res) => {
    const { title, description, assignedTo } = req.body;
  
    const task = new Task({
      title,
      description,
      assignedTo,
    });
  
    await task.save();
  
    res.send(task);
  });
  
  router.get("/tasks", async (req, res) => {
    const tasks = await Task.find().populate("assignedTo", "username");
    res.send(tasks);
  });

module.exports = router;