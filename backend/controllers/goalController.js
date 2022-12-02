const asyncHandler = require("express-async-handler");

// @des    GET GOALS
// @route  GET /api/goals
// @access PRIVATE
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "GET GOALS" });
});

// @des    SET GOAL
// @route  POST /api/goals
// @access PRIVATE
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Title cannot be empty");
  }
  res.status(200).json({ message: "SET GOAL" });
});

// @des    UPDATE GOALS
// @route  PUT /api/goals/:id
// @access PRIVATE
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `UPDATE GOAL ${req.params.id}` });
});

// @des    DELETE GOALS
// @route  DELETE /api/goals/:id
// @access PRIVATE
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `DELETE GOAL ${req.params.id} ` });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
