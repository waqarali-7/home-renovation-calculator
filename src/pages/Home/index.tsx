import { useEffect, useState, useContext } from "react";
import { ResultContext } from "../../contexts/ResultContext";
import { useNavigate } from "react-router";
import Question from "../../components/Question";
import { QuestionProps, LocalStateProps } from "../../types";
import { questions } from "../../utils/questions";
import { localStateInitial } from "../../utils/initials";
import { calculatePrice } from "../../functions/home";

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const { contextState, updateContextState, addRows } =
    useContext(ResultContext);
  const [state, setState] = useState<LocalStateProps>(localStateInitial);

  const { questionNum, tileQuestion, questionsBank, currentQuestion } = state;
  const { rows, amount } = contextState;
  const handleChosenAnswer = (chosenAnwser: string, answerIndex: number) => {
    if (
      currentQuestion?.isLeft &&
      (isNaN(+amount) || (amount <= 0 && chosenAnwser === "Yes"))
    ) {
      return;
    } else if (currentQuestion?.isLeft && chosenAnwser === "No") {
      updateContextState("isLeft", true);
    }
    nextQuestion(currentQuestion, answerIndex, chosenAnwser);
  };

  const updateState = (key: string, val: any) => {
    setState((current: LocalStateProps) => ({
      ...current,
      [key]: val,
    }));
  };

  const nextQuestion = (
    currentQuestion: QuestionProps,
    answerIndex: number,
    chosenAnwser: string
  ) => {
    switch (chosenAnwser) {
      case "Yes":
        updateState("questionNum", currentQuestion.next!);
        return;
      case "No":
        if (currentQuestion.skipTo) {
          updateState("questionNum", currentQuestion.skipTo!);
          return;
        }
        updateContextState("showResult", true);
        navigate("/result");
        return;
      default:
        if (currentQuestion.tile) {
          updateState("tileQuestion", {
            desc: currentQuestion.desc ?? "",
            class: currentQuestion.options[answerIndex],
            price: currentQuestion.prices![answerIndex],
          });
          updateState("questionNum", currentQuestion.next!);
          return;
        }

        calculatePrice(
          currentQuestion,
          rows,
          addRows,
          answerIndex!,
          tileQuestion
        );

        if (currentQuestion.showResult) {
          updateContextState("showResult", true);
          navigate("/result");
          return;
        }
        updateState("questionNum", currentQuestion.next!);
        return;
    }
  };

  useEffect(() => {
    updateState("questionsBank", questions);
    updateState("currentQuestion", questionsBank[questionNum]);
  }, [questionsBank, questionNum]);

  return (
    <div>
      <Question
        question={currentQuestion}
        handleChosenAnswer={handleChosenAnswer}
      />
    </div>
  );
};

export default Home;
