const TaskModel = require("../Models/TaskModel");

const createTask = async (req, res) => {
  const { title, description, dateTime, deadLine, priority, status } = req.body;

  console.log("User Info from authMiddleware: ", req.user);
  if (
    !title ||
    !description ||
    !dateTime ||
    !deadLine ||
    !priority ||
    !status
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newTask = new TaskModel({
      title,
      description,
      dateTime,
      deadLine,
      priority,
      status,
      user: req.user.userId,
    });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, priority, status, deadLine } = req.body;

  if (!title && !description && !priority && !status && !deadLine) {
    return res
      .status(400)
      .json({ message: "At least one field is required for update" });
  }

  try {
    const task = await TaskModel.findOne({
      _id: taskId,
      user: req.user.userId,
    });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized access" });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (priority) task.priority = priority;
    if (status) task.status = status;
    if (deadLine) task.deadLine = deadLine;

    const updatedTask = await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findOne({ _id: id, user: req.user.userId });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized access" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ user: req.user.userId }).sort({
      deadLine: 1,
    });
    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findOne({ _id: id, user: req.user.userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTasksByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const tasks = await TaskModel.find({ user: req.user.userId, status }).sort({
      deadLine: 1,
    });

    if (tasks.length === 0) {
      return res.status(404).json({ message: `No ${status} tasks found` });
    }

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  getTasksByStatus,
};
