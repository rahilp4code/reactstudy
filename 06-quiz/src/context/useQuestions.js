import { createContext, useContext } from "react";
export const QuestionContext = createContext();

export default function useQuestion() {
  const context = useContext(QuestionContext);
  if (context === undefined) throw new Error("Context is outside of Provider");
  return context;
}
