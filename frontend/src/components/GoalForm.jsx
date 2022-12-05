import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function GoalForm() {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="title"> </label>
            </div>
        </form>
      </section>
    </>
  );
}

export default GoalForm;
