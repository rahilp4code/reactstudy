import { useEffect } from "react";
import useQuestion from "../context/useQuestions";

function Timer() {
  const {
    timer,

    dispatch,
  } = useQuestion();
  const min = Math.floor(timer / 60);
  const sec = timer % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
