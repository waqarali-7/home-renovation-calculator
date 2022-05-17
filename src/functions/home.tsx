import { QuestionProps, Row } from "../types";

export const calculatePrice = (
  currentQuestion: QuestionProps,
  rows: Row[],
  addRows: Function,
  answerIndex: number,
  tileQuestion?: Row,
) => {
  let obj: Row = {
    desc: currentQuestion.desc ?? "",
    class: currentQuestion.options[answerIndex],
    price: currentQuestion.prices![answerIndex],
  };

  if (currentQuestion.size) {
    obj = {
      desc: tileQuestion!.desc,
      class: tileQuestion!.class,
      price: tileQuestion!.price * currentQuestion.prices![answerIndex],
    };
  }
  addRows(rows, obj);
};
