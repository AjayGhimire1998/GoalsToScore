import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { createUserGoal, closeGoalForm } from "../features/goals/goalSlice";

function GoalForm() {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const tasks = [];

  // const formData = {
  //   title: "",
  //   tasks: []
  // };
  // const { title, task } = formData;

  const dispatch = useDispatch();

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onTaskChange = (e) => {
    setTask(e.target.value);
  };

  const onTaskAdd = (e) => {
    tasks.push(task);
    setTask("");
    return tasks;
  };
  console.log(tasks);

  // console.log(formData);

  const onSubmit = (e) => {
    e.preventDefault();
    const goalData = {
      title,
      task,
    };

    dispatch(createUserGoal(goalData));

    // setFormData({
    //   title: "",
    //   task: [],
    // });
  };

  return (
    <>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <div>
              <h3>
                Set a Goal
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
              placeholder="Describe Your Goal"
            />
            <IoAddCircle className="icon" size={"40px"} onClick={onTaskAdd} />
            <br />
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
