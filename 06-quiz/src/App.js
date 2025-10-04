import Header from "./component/Header";
import "./index.css";
// import Counter from "./component/counter";
import { useEffect, useReducer } from "react";

const initialVal = {
  questions: [],

  // loading, active, error, finished, ready
  status: "loading",
};

function reducer() {}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialVal);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err.message));
  }, []);
  return (
    <div className="app">
      <Header />
    </div>
  );
}
