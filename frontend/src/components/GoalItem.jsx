import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteUserGoal } from "../features/goals/goalSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  return (
    <div className="goal">
      <div>
        <small>{new Date(goal.createdAt).toLocaleString("en-AU")}</small>
        <h3>{goal.title}</h3>
        <br />
        <p>{goal.description}</p>
        <FaWindowClose
          className="close"
          onClick={() => dispatch(deleteUserGoal(goal._id))}
        />
      </div>
    </div>
  );
}

export default GoalItem;
