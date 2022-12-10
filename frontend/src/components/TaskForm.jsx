import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { closeAddTaskForm } from "../features/goals/goalSlice";

function TaskForm() {
  const dispatch = useDispatch();

  const [task, setTask] = useState("");

  const onTaskChange = (e) => {
    setTask(e.target.value)
  }
  return (
    <>
      <div className="form-group">
        <div>
          <h4>
            Add a Task
            <p style={{ float: "right" }}>
              <FaWindowClose
                size={"25px"}
                onClick={() => dispatch(closeAddTaskForm())}
              />
            </p>
          </h4>
        </div>
        <input
          type="text"
          id="task"
          name="task"
          // value={task}
          onChange={onTaskChange}
          placeholder="Add task to your goal."
        />
      </div>
    </>
  );
}

export default TaskForm;
