const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require("../models/task");
const Board = require("../models/board");
const Column = require("../models/column");

const router = express.Router();

router.post("/create-task", async (req, res) => {
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
    const boards = await Board.find().populate({
      path: 'columns',
      populate: {
        path: 'tasks',
        model: 'Task'
      }
    });
    res.send({boards:boards});
  });

  router.post("/create-board", async (req, res) => {
    const { title, columns } = req.body;
  
    const board = new Board({
      title,
      columns
    });
  
    await board.save();
  
    res.send({boards:board});
  });

  router.post("/create-column", async (req, res) => {
    const { name, tasks, id } = req.body;
  
    const column = new Column({
      name,
      tasks
    });
  
    await column.save();
  
    res.send({id});
  });

module.exports = router;