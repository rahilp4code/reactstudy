import useQuestion from "../context/useQuestions";

function Question() {
  const { questions, index, answer, dispatch } = useQuestion();
  const question = questions[index];
  const hasAns = answer !== null;
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAns
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={hasAns}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
