import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { QuestionProvider } from "./context/questionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QuestionProvider>
      <App />
    </QuestionProvider>
  </React.StrictMode>
);
