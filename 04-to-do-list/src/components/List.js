import { useState } from "react";

export default function PackingList({
  tasks,
  onDeleteTask,
  checkBox,
  clearAll,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedTask;
  if (sortBy === "input") sortedTask = tasks;
  if (sortBy === "description")
    sortedTask = tasks
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "done")
    sortedTask = tasks.slice().sort((a, b) => Number(a.done) - Number(b.done));
  return (
    <div className="list">
      <ul>
        {sortedTask.map((tasks) => (
          <Tasks
            data={tasks}
            onDeleteTask={onDeleteTask}
            checkBox={checkBox}
            key={tasks.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="done">Sort by completed tasks</option>
        </select>
        <button onClick={clearAll}>Clear list</button>
      </div>
    </div>
  );
}
function Tasks({ data, onDeleteTask, checkBox }) {
  return (
    <li>
      <input
        type="checkbox"
        value={data.done}
        onChange={() => checkBox(data.id)}
        key={data.id}
      />
      <span style={data.done ? { textDecoration: "line-through" } : {}}>
        {data.quantity} {data.description}
      </span>
      <button onClick={() => onDeleteTask(data.id)}>❌</button>
    </li>
  );
}
