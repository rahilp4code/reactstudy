import useQuestion from "../context/useQuestions";

function ReadyState() {
  const {
    qLength,

    dispatch,
  } = useQuestion();
  return (
    <div className="start">
      <h2>Welcome to the React Quize!</h2>
      <h3>{qLength} Questions to test your React knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        start quiz
      </button>
    </div>
  );
}

export default ReadyState;
