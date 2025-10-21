import PropTypes from "prop-types";
import { QuestionContext } from "./useQuestions";
import { useEffect, useReducer } from "react";

//  states to context api with reducer

QuestionProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

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

export function QuestionProvider({ children }) {
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
    <QuestionContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        timer,
        qLength,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
