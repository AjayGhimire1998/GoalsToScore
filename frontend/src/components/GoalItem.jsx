import React from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserGoal,
  openAddTaskForm,
  setGoalId,
  // replaceUpdatedGoal,
} from "../features/goals/goalSlice";
import TaskForm from "./TaskForm";
import axios from "axios";
import { API_URL } from "../features/goals/goalServices";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const { isAddTaskFormOpen, goalId, goals } = useSelector(
    (store) => store.goals
  );

  const dateAndTime = new Date(goal.createdAt).toLocaleString("en-AU");
  const indexOfComma = dateAndTime.indexOf(",");
  const dateCreated = dateAndTime.slice(0, indexOfComma);
  const timeCreated = dateAndTime.slice(indexOfComma + 1);

  const onToggle = async (e, taskId) => {
    const updatingTask = goals
      .find((item) => item._id === goal._id)
      .tasks.find((task) => task._id === taskId);

    const data = {
      active: !updatingTask.active,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    const res = await axios.put(
      API_URL + goal._id + "/task/" + taskId,
      data,
      config
    );
    // dispatch(replaceUpdatedGoal(res.data.tasks.find((task) => task._id === taskId)));
    window.location.reload();
  };

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
                  <li
                    key={task?._id}
                    style={
                      task.active === false
                        ? { textDecoration: "line-through" }
                        : {
                            textShadow:
                              " 0 0 1em white, 0 0 0.2em white",
                              fontWeight: "bolder"
                          }
                    }
                  >
                    {index + 1}: {task?.task.toUpperCase()}
                  </li>
                  <div>
                    <small style={{ fontSize: "10px" }}>pending..</small>
                    <label className="switch">
                      <input
                        type="checkbox"
                        value={task.active}
                        className="checkbox"
                        defaultChecked={!task.active}
                        onChange={(e) => onToggle(e, task._id)}
                      />
                      <span className="slider round"></span>
                    </label>
                    <small style={{ fontSize: "10px" }}>..done</small>
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
