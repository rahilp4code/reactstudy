import useQuestion from "../context/useQuestions";

function Progress() {
  const { index, answer, points, qLength, totalPoints } = useQuestion();
  return (
    <header className="progress">
      <progress max={qLength} value={index + Number(answer !== null)} />
      <p>
        Questions{" "}
        <strong>
          {index + 1}/{qLength}
        </strong>
      </p>
      <p>
        {points}/{totalPoints}
      </p>
    </header>
  );
}

export default Progress;
