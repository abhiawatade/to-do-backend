const express = require("express");
const Todo = require("../models/todoModel");
const router = express.Router();

router.get("/todo", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.get("/todo/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id } });
    return res.status(200).json(todo);

    if (!todo) {
      return res.status(404).send("not found");
    }
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.post("/todo", async (req, res) => {
  try {
    const { title, description, dueDate, completed, priority } = req.body;
    if (!title) {
      return res.status(404).json("Title is missing");
    }
    const todo = { title, description, dueDate, completed, priority };
    const createTodo = await Todo.create(todo);
    return res.status(200).json({
      message: `Great your task is added successfully`,
    });
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.put("/todo/:id", async (req, res) => {
  try {
    const { title, description, dueDate, completed, priority } = req.body;
    const todo = await Todo.findOne({ where: { id: req.params.id } });

    if (!todo) {
      return res.status(404).send("To do not found");
    }
    if (!title) {
      return res.status(404).send("title not found");
    }

    const updateToDo = await Todo.update(
      { title, description, dueDate, completed, priority },
      { where: { id: req.params.id } }
    );

    return res.status(200).json({ message: "todo updated successfully" });
  } catch (error) {
    return res.status(404).send(error, "to do doesn't exist ");
  }
});

router.delete("/todo/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id } });

    if (!todo) {
      return res.status(404).send("to do task not found");
    }

    await Todo.destroy({ where: { id: req.params.id } });

    return res.status(200).send("success! todo deleted");
  } catch (error) {
    return res.status(404).send(error, "to do doesn't exist ");
  }
});

module.exports = router;
