const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @des    GET GOALS
// @route  GET /api/goals
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @des    SET GOAL
// @route  POST /api/goals
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Title cannot be empty");
  }

  if (!req.body.description) {
    res.status(400);
    throw new Error("Description cannot be empty");
  }
  const newGoal = await Goal.create({
    title: req.body.title,
    description: req.body.description,
    user: req.user.id,
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

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
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
  res
    .status(200)
    .json({ message: ` GOAL ${goal.title} successfully deleted ` });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
