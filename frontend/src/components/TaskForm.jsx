import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  closeAddTaskForm,
  replaceUpdatedGoal,
} from "../features/goals/goalSlice";
import { API_URL } from "../features/goals/goalServices";
import axios from "axios";

function TaskForm({ goal }) {
  const dispatch = useDispatch();

  const [addingTask, setAddingTask] = useState("");

  const onTaskChange = (e) => {
    setAddingTask(e.target.value);
  };

  const addTask = async (e) => {
    e.preventDefault();
    const data = {
      task: addingTask,
      active: true,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    const res = await axios.put(API_URL + goal._id, data, config);
    dispatch(replaceUpdatedGoal(res.data));
    setAddingTask("");
  };
  return (
    <>
      <form onSubmit={addTask}>
        <div className="form-group">
          <div>
            <h4>
              Add a Task
              <p style={{ float: "right" }}>
                <FaWindowClose
                  size={"20px"}
                  onClick={() => dispatch(closeAddTaskForm())}
                />
              </p>
            </h4>
          </div>
          <input
            type="text"
            id="task"
            name="task"
            value={addingTask}
            onChange={onTaskChange}
            placeholder="Add task to your goal."
          />
        </div>
        <div className="form-group">
          <button className="add-task">Add</button>
        </div>
      </form>
    </>
  );
}

export default TaskForm;
