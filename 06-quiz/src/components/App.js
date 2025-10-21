import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import ReadyState from "./ReadyState";
import Question from "./Questions";
import NextButton from "./NextButton";
// import Counter from "./component/counter";
// import { useEffect, useReducer } from "react";
import Progress from "./Progress";
import Finish from "./Finish";
import Footer from "./Footer";
import Timer from "./Timer";
import useQuestions from "../context/useQuestions";

export default function App() {
  const { status } = useQuestions();
  return (
    <div className="app">
      <Header />
      <main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <ReadyState />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finish" && <Finish />}
      </main>
    </div>
  );
}

// future Improvmensts:
// 1] add num of questions to select
// 2] back and forth between question save the answer in an array
// 3] difficulty thingy
