import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { createUserGoal, closeGoalForm } from "../features/goals/goalSlice";

function GoalForm() {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    tasks: [],
  });

  const dispatch = useDispatch();

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onTaskChange = (e) => {
    setTask(e.target.value);
  };

  const onTaskAdd = (e) => {
    setFormData((prevState) => ({
      title: title,
      tasks: [...prevState.tasks, { task: task, active: true }],
    }));
    setTask("");
  };
  console.log(formData);

  const onSubmit = (e) => {
    e.preventDefault();
    const goalData = {
      title,
      tasks: formData.tasks,
    };

    dispatch(createUserGoal(goalData));
  };

  return (
    <>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <div>
              <h3>
                Set a New Goal
                <p style={{ float: "right" }}>
                  <FaWindowClose
                    size={"25px"}
                    onClick={() => dispatch(closeGoalForm())}
                  />
                </p>
              </h3>
            </div>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={onTitleChange}
              placeholder="Name Your Goal"
            />

            <input
              name="task"
              id="task"
              value={task}
              onChange={onTaskChange}
              placeholder="Add Task to Your Goal"
            />
            <IoAddCircle className="icon" size={"40px"} onClick={onTaskAdd} />
            <br />
            <div>
              <ul>
                {formData?.tasks.map((task, index) => {
                  return (
                    <li key={task[index]}>
                      {index + 1}: {task?.task.toUpperCase()}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default GoalForm;
