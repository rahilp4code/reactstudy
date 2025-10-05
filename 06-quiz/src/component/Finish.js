function Finish() {
  const percentage = (points / totalPoints) * 100;
  return (
    <p>
      You scored <strong>{points}</strong> out of {totalPoints} (
      {Math.ceil(percentage)})
    </p>
  );
}

export default Finish;
