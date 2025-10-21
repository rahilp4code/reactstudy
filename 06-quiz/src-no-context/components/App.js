import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import ReadyState from "./ReadyState";
import Question from "./Questions";
import NextButton from "./NextButton";
// import Counter from "./component/counter";
import { useEffect, useReducer } from "react";
import Progress from "./Progress";
import Finish from "./Finish";
import Footer from "./Footer";
import Timer from "./Timer";

const SEC_PER_QUESTION = 30;
const initialVal = {
  questions: [],

  // loading, active, error, finished, ready
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timer: null,
};

function reducer(state, action) {
  const actions = {
    fetchedData: () => ({
      ...state,
      questions: action.payload,
      status: "ready",
    }),
    error: () => ({ ...state, status: "error" }),
    start: () => ({
      ...state,
      status: "active",
      timer: state.questions.length * SEC_PER_QUESTION,
    }),
    newAnswer: () => {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    },
    nextQuestion: () => ({ ...state, index: state.index + 1, answer: null }),
    finish: () => ({
      ...state,
      status: "finish",
      highScore:
        state.points > state.highScore ? state.points : state.highScore,
    }),
    reStart: () => ({
      ...initialVal,
      status: "ready",
    }),
    timer: () => ({
      ...state,
      timer: state.timer - 1,
      status: state.timer === 0 ? "finish" : state.status,
    }),
  };

  return actions[action.type]?.() ?? state;
}

export default function App() {
  const [
    { questions, status, index, answer, points, highScore, timer },
    dispatch,
  ] = useReducer(reducer, initialVal);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "fetchedData", payload: data }))
      .catch(() => dispatch({ type: "error" }));
  }, []);

  const qLength = questions.length;
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  return (
    <div className="app">
      <Header />
      <main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <ReadyState qLength={qLength} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              qLength={qLength}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} reamiainingTime={timer} />
              <NextButton
                index={index}
                qLength={qLength}
                dispatch={dispatch}
                answer={answer}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <Finish
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </main>
    </div>
  );
}

// future Improvmensts:
// 1] add num of questions to select
// 2] back and forth between question save the answer in an array
// 3] difficulty thingy
