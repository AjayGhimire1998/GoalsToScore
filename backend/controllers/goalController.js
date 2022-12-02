const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
// @des    GET GOALS
// @route  GET /api/goals
// @access PRIVATE
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

// @des    SET GOAL
// @route  POST /api/goals
// @access PRIVATE
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Title cannot be empty");
  }
  const newGoal = await Goal.create({
    title: req.body.title,
  });
  res.status(200).json(newGoal);
});

// @des    UPDATE GOALS
// @route  PUT /api/goals/:id
// @access PRIVATE
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
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
  await goal.remove();
  res
    .status(200)
    .json({ message: ` GOAL ${goal.title} successfully deleted ` });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
