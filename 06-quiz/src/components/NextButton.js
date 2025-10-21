import useQuestion from "../context/useQuestions";

function NextButton() {
  const { index, answer, qLength, dispatch } = useQuestion();
  if (answer === null) return null;
  if (index < qLength - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === qLength - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
