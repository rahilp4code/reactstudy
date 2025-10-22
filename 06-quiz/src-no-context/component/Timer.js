import { useEffect } from "react";

function Timer({ dispatch, reamiainingTime }) {
  const min = Math.floor(reamiainingTime / 60);
  const sec = reamiainingTime % 60;
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
