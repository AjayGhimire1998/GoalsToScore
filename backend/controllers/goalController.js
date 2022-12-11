const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
// const User = require("../models/userModel");
// const Task = require('../models/taskModel')

// @des    GET GOALS
// @route  GET /api/goals
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  // console.log(req.user.id);

  res.status(200).json(goals);
});

// @des    SET GOAL
// @route  POST /api/goals
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.title && !req.body.tasks) {
    res.status(400);
    throw new Error("Title and Tasks cannot be empty");
  }
  if (!req.body.title) {
    res.status(400);
    throw new Error("Title cannot be empty");
  }

  if (!req.body.tasks) {
    res.status(400);
    throw new Error("Tasks cannot be empty");
  }

  const newGoal = await Goal.create({
    title: req.body.title,
    user: req.user.id,
    tasks: req.body.tasks,
  });
  res.status(200).json(newGoal);
});

// @des    UPDATE GOALS
// @route  PUT /api/goals/:id
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
  }

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  //make sure the logged user matches the goal's user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  // const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  // });
  const updatedGoal = await Goal.findOneAndUpdate(
    { _id: goal._id.toString() },
    { $push: { tasks: req.body } },
    { new: true }
  );

  res.status(200).json(updatedGoal);
});

// @desc UPDATE SUB_GOAL STATUS
// @route UPDATE /api/goals/:id/task/:taskId

const updateTaskStatus = asyncHandler(async (req, res) => {
  const updatedTask = await Goal.findOneAndUpdate(
    { _id: req.params.id, "tasks._id": req.params.taskId },
    {
      $set: {
        "tasks.$.active": req.body.active,
      },
    }
  );

  res.status(200).json(updatedTask);
});
// @des    DELETE GOALS
// @route  DELETE /api/goals/:id
// @access PRIVATE
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Cannot find the goal");
  }
  // const user = await User.findById(req.user.id);

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  //make sure the logged user matches the goal's user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
  await goal.remove();
  res.status(200).json(goal._id);
});

module.exports = { getGoals, setGoal, updateGoal, updateTaskStatus, deleteGoal };
