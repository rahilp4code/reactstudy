import useQuestion from "../context/useQuestions";

function Finish() {
  const { points, highScore, totalPoints, dispatch } = useQuestion();
  const percentage = (points / totalPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage < 100 && percentage >= 80) emoji = "🥈";
  if (percentage < 80 && percentage >= 50) emoji = "🥉";
  if (percentage < 50 && percentage >= 25) emoji = "👍";
  if (percentage < 25 && percentage >= 10) emoji = "🥸";
  if (percentage === 0) emoji = "🤡";
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(percentage)}%){emoji}
      </p>
      <p className="highscore">Highscore: {highScore} </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reStart" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default Finish;
