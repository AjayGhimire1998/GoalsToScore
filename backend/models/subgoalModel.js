const mongoose = require("mongoose");

const subgoalSchema = mongoose.Schema(
  {
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Goal",
    },
    task: {
      type: String,
    //   required: [true, "Please add a task"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subgoal", subgoalSchema);