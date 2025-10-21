import { useReducer } from "react";

export default function Counter() {
  function reducer(state, action) {
    // if (action.type === "dec") return state - 1;
    // if (action.type === "inc") return state + 1;
    // if (action.type === "set") return action.val;
    switch (action.type) {
      case "dec":
        return { ...state, count: state.count - state.step };
      case "inc":
        return { ...state, count: state.count + state.step };
      case "setCount":
        return { ...state, count: action.val };
      case "setStep":
        return { ...state, step: action.val };
      case "reset":
        return { step: 1, count: 0 };
      default:
        throw new Error("Wrong");
    }
  }
  // const [step, countSteps] = useState(1);
  // const [count, counter] = useState(0);

  const initialVal = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialVal);
  const { count, step } = state;

  const date = new Date();
  date.setDate(date.getDate() + count);

  function handleReset() {
    // countSteps(1);
    // counter(0);
    dispatch({ type: "reset" });
  }

  return (
    <div>
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          // onChange={(e) => countSteps(Number(e.target.value))}
          onChange={(e) =>
            dispatch({ type: "setStep", val: Number(e.target.value) })
          }
        />
        <span>{step}</span>
      </div>

      <div>
        {/* <button onClick={() => counter((s) => s - step)}>-</button> */}
        <button onClick={() => dispatch({ type: "dec" })}>-</button>
        <input
          type="text"
          value={count}
          // onChange={(e) => counter(Number(e.target.value))}
          onChange={(e) =>
            dispatch({ type: "setCount", val: Number(e.target.value) })
          }
        />
        <button onClick={() => dispatch({ type: "inc" })}>+</button>
      </div>

      <p>
        {count === 0
          ? "today is "
          : count > 0
          ? `${count} days from today is `
          : `${Math.abs(count)} days ago was `}
        {date.toDateString()}
      </p>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
