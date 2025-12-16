import Task from "../models/Task.js";

// Get all tasks for user
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
};

// Add new task
export const addTask = async (req, res) => {
  const task = await Task.create({ user: req.user, title: req.body.title });
  res.status(201).json(task);
};


// Update task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, completed: req.body.completed },
      { new: true } // return the updated document
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task); // return updated task
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Delete task
export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
