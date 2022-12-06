import { useState } from "react";
import {  FaWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createUserGoal, closeGoalForm } from "../features/goals/goalSlice";

function GoalForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const { title, description } = formData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const goalData = {
      title,
      description,
    };

    dispatch(createUserGoal(goalData));

    setFormData({
      title: "",
      description: "",
    });
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
                  <FaWindowClose size={"25px"} onClick={() => dispatch(closeGoalForm())}/>
                </p>
              </h3>
            </div>

            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Name Your Goal"
            ></input>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              value={description}
              onChange={onChange}
              placeholder="Describe Your Goal"
            ></textarea>
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
