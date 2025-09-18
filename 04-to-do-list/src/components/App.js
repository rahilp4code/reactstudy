import { useState } from "react";
// import Logo from "./Logo";
import Form from "./Form";
import List from "./List";
import Stat from "./Stat";

// ITS HELPFUL TO USE A DUMMY DATA FIRST TO CREATE THE BASE
// const initialItems = [
//   { id: 1, description: "React", quantity: 40, done: false },
//   { id: 2, description: "DSA", quantity: 2, done: false },
//   { id: 3, description: "sleep", quantity: 2, done: true },
// ];

function App() {
  const [task, addTask] = useState([]);
  function clearAll() {
    const confirm = window.confirm("Are you sure about that");
    if (confirm) addTask([]);
  }
  function handleTask(item) {
    addTask((items) => [...items, item]);
  }
  function handleDeleteTask(id) {
    addTask((items) => items.filter((item) => item.id !== id));
  }
  function handleCheckbox(id) {
    addTask((items) =>
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }
  return (
    <div className="app">
      {/* <Logo /> */}
      <Form addTask={handleTask} />
      <List
        tasks={task}
        onDeleteTask={handleDeleteTask}
        checkBox={handleCheckbox}
        clearAll={clearAll}
      />
      <Stat task={task} />
    </div>
  );
}

export default App;

//
//83 delete button work krneke liye pehle function then usko pass kiya child meh,
//84 checkbox banaya
//85 derived state
//86 using derived state to implement the footer data
//87 made sorting selection
//88 clear button
//89 component seperation and refractoring
//90 exercise
//91 chilren prop
