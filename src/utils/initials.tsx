import { ContextState, Row, QuestionProps } from "../types";

export const rowInitial: Row = {
  desc: "",
  class: "",
  price: 0,
};
export const appInitial: ContextState = {
  isLeft: false,
  showResult: false,
  amount: 0,
  rows: [],
};
export const questionInitial: QuestionProps = {
  id: 0,
  question: "",
  options: [],
  prices: [],
};

export const localStateInitial = {
  questionNum: 0,
  questionsBank: [],
  currentQuestion: questionInitial,
  tileQuestion: rowInitial,
};
