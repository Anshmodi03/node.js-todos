const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// Render index.ejs
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.render("index", { todos });
});

// Handle adding, deleting, and completing todos
router.post("/:action/:id?", async (req, res) => {
  const { action } = req.params;

  if (action === "add") {
    const todo = new Todo({ task: req.body.task });
    await todo.save();
  } else if (action === "delete") {
    await Todo.findByIdAndDelete(req.params.id);
  } else if (action === "complete") {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
  }

  res.redirect("/");
});

module.exports = router;
