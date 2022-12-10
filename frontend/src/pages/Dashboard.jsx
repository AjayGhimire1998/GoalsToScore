import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import {
  getUserGoals,
  reset,
  openGoalForm,
  closeGoalForm,
} from "../features/goals/goalSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { goals, isError, isLoading, message, isGoalFormOpen } = useSelector(
    (store) => store.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getUserGoals());
    if (message) {
      toast.error(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h3> Welcome {user && user.name}</h3>
      </section>

      {isGoalFormOpen ? (
        <GoalForm />
      ) : (
        <div className="form">
          <button
            className="btn btn-block"
            onClick={() => dispatch(openGoalForm())}
          >
            Set A Goal !
          </button>
        </div>
      )}
      <br/>
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <>
            <br />
            <h2>You have not set any goals.</h2>
          </>
        )}
      </section>
    </>
  );
}

export default Dashboard;
