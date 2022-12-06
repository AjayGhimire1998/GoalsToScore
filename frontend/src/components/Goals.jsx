import { useSelector, useDispatch } from "react-redux";

function Goals({ goals }) {
  return (
    <>
      {goals.map((goal) => {
        return <li key={goal._id}>{goal.title}</li>;
      })}
    </>
  );
}

export default Goals;
