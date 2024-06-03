import ErrorHandler from "../middlewares/error.js";
import { task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Another way to add data
    // const task = new task({title,description});
    // await task.save();

    // Simple way to add data
    await task.create({ title, description, user: req.user });

    res.status(201).json({
      success: true,
      message: "Task added successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const myTasks = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const tasks = await task.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updateTask = await task.findById(id);
    if (!updateTask) return next(new ErrorHandler("Task Not Found", 404));
    updateTask.isCompleted = !updateTask.isCompleted;
    await updateTask.save();

    res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteTask = await task.findById(id);

    if (!deleteTask) return next(new ErrorHandler("Invalid Id", 404));
    await deleteTask.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};
