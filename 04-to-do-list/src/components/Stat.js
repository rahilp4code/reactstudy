export default function Stat({ task }) {
  if (task.length === 0)
    return (
      <footer className="stats">
        <em>Start adding your goals for today</em>
      </footer>
    );

  const taskLength = task.length;
  const taskDone = task.filter((task) => task.done).length;
  const completePercent = Math.round((taskDone / taskLength) * 100);
  if (completePercent === 100)
    return (
      <footer className="stats">
        <em>Todays tasks are COMPLETED🔥</em>
      </footer>
    );
  return (
    <footer className="stats">
      <em>
        💪You have {taskLength} tasks in your list, and you already completed{" "}
        {taskDone} ({completePercent}%)
      </em>
    </footer>
  );
}
