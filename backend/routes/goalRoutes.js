const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
  updateTaskStatus,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getGoals);

router.post("/", protect, setGoal);

router.put("/:id", protect, updateGoal);
router.put("/:id/task/:taskId", protect, updateTaskStatus);

router.delete("/:id", protect, deleteGoal);

module.exports = router;
