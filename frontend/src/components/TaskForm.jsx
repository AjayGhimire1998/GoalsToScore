import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeAddTaskForm, editUserGoal } from "../features/goals/goalSlice";
import { API_URL } from "../features/goals/goalServices";

function TaskForm({ goal }) {
  const dispatch = useDispatch();
  // const { goalId } = useSelector((store) => store.goals);

  const [addingTask, setAddingTask] = useState("");

  const onTaskChange = (e) => {
    setAddingTask(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    const data = {
      task: addingTask,
      active: true,
    };

    console.log(API_URL + goal._id, data);
    dispatch(editUserGoal(goal._id, data));
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
