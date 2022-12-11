import React from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserGoal,
  openAddTaskForm,
  setGoalId,
} from "../features/goals/goalSlice";
import TaskForm from "./TaskForm";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const { isAddTaskFormOpen, goalId } = useSelector((store) => store.goals);

  const dateAndTime = new Date(goal.createdAt).toLocaleString("en-AU");
  const indexOfComma = dateAndTime.indexOf(",");
  const dateCreated = dateAndTime.slice(0, indexOfComma);
  const timeCreated = dateAndTime.slice(indexOfComma + 1);

  return (
    <div className="goal">
      <div>
        <div className="edit-delete">
          <small>Date: {dateCreated}</small>
          <small>Time: {timeCreated}</small>
        </div>
        <br />
        <br />
        <h1>{goal.title.toUpperCase()}</h1>
        <br />
        <ul>
          {goal.tasks.map((task, index) => {
            return (
              <>
                <div className="task-items">
                  <li key={task?._id}>
                    {index + 1}: {task?.task.toUpperCase()}
                  </li>
                  <div>
                    <small style={{ fontSize: "10px" }}>pending</small>
                    <label className="switch">
                      <input
                        type="checkbox"
                        // checked={task.active === true ? true : !false}
                        onChange={() => console.log("Checked")}
                      />
                      <span className="slider round"></span>
                    </label>
                    <small style={{ fontSize: "10px" }}>done</small>
                  </div>
                </div>
                <hr />
                <br />
              </>
            );
          })}
        </ul>
        <br />
        {isAddTaskFormOpen && goal._id === goalId ? (
          <TaskForm goal={goal} />
        ) : null}
        <br />
        <div className="edit-delete">
          <FaPlus
            size={"30px"}
            className="icon"
            onClick={() => {
              dispatch(setGoalId(goal._id));
              dispatch(openAddTaskForm());
            }}
          />
          <IoMdDoneAll
            size={"30px"}
            className="icon"
            onClick={() => dispatch(deleteUserGoal(goal._id))}
          />
        </div>
      </div>
    </div>
  );
}

export default GoalItem;
