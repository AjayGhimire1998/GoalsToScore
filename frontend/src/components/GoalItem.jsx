import React from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { useDispatch } from "react-redux";
import { deleteUserGoal } from "../features/goals/goalSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();

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
                  <li key={task._id}>
                    {index + 1}: {task.task.toUpperCase()}
                  </li>
                  <label className="switch">
                    <input
                      type="checkbox"
                      onChange={() => console.log("checked")}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <hr />
                <br />
              </>
            );
          })}
        </ul>
        <br />
        <p>{goal.description}</p>
        <div className="edit-delete">
          <FaEdit
            size={"30px"}
            className="icon"
            onClick={() => dispatch(deleteUserGoal(goal._id))}
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
