import { useEffect, useState } from "react";
import Question from "./components/Question";
import { questions } from "./utils/questions";
import Layout from "../src/components/Layout";
import { QuestionProps } from "./utils/questions";

const prices: number[] = [];
function App(): JSX.Element {
  let initial: QuestionProps = {
    id: 0,
    question: "",
    options: [],
    prices: [],
  };
  const [questionsBank, setQuestionsBank] = useState<QuestionProps[]>([]);
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionProps>(initial);
  const [chosenAnwser, setChosenAnwser] = useState<string>("");
  const [questionNum, setQuestionNum] = useState(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [optionIndex, setOptionIndex] = useState<number>();
  const [isResult, setIsResult] = useState<boolean>(false);
  const [floorPrice, setFloorPrice] = useState<number>(0);

  // Price Calculation against each question
  const calculatePrice = (questionIndex: number, answerIndex: number) => {
    let question: QuestionProps = {
      id: 0,
      question: "",
      options: [],
      prices: [],
    };
    let optionPrice = 0;
    switch (questionIndex) {
      case 2:
      case 3:
      case 4:
        question = questionsBank[questionIndex];
        optionPrice = question.prices![answerIndex];
        prices.push(optionPrice);
        return;
      case 7:
      case 8:
        question = questionsBank[questionIndex];
        setFloorPrice(question.prices![answerIndex]);
        return;
      case 9:
        question = questionsBank[questionIndex];
        optionPrice = question.prices![answerIndex];
        const finalFloorPrice = optionPrice * floorPrice;
        prices.push(finalFloorPrice);
        return;
      default:
        return;
    }
  };

  // Grand total calculation
  const result = prices.reduce(
    (total, currentValue) => (total = total + currentValue),
    0
  );

  const nextQuestion = (
    currentQuestion: QuestionProps,
    optionIndex: number
  ) => {
    switch (chosenAnwser) {
      case "Yes":
        setQuestionNum(currentQuestion.next!);
        setIsAnswered(false);
        return;
      case "No":
        if (currentQuestion.skipTo! !== 10) {
          setQuestionNum(currentQuestion.skipTo!);
          setIsAnswered(false);
          return;
        }
        calculatePrice(questionNum, optionIndex!);
        setIsAnswered(false);
        setIsResult(true);
        return;
      case "Ceramic":
        setQuestionNum(currentQuestion.next!);
        setIsAnswered(false);
        return;
      case "Marble":
        setQuestionNum(currentQuestion.skipTo!);
        setIsAnswered(false);
        return;
      default:
        if (questionNum === 9) {
          calculatePrice(questionNum, optionIndex!);
          setIsAnswered(false);
          setIsResult(true);
          return;
        }
        setQuestionNum(currentQuestion.next!);
        calculatePrice(questionNum, optionIndex!);
        setIsAnswered(false);
        return;
    }
  };

  useEffect(() => {
    setQuestionsBank(questions);
    setCurrentQuestion(questionsBank[questionNum]);
    if (isAnswered) {
      nextQuestion(currentQuestion, optionIndex!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsBank, questionNum, isAnswered, optionIndex]);
  return (
    <div className="container">
      {currentQuestion && (
        <Question
          result={result}
          isResult={isResult}
          question={currentQuestion}
          setIsAnswered={setIsAnswered}
          setChosenAnwser={setChosenAnwser}
          setOptionIndex={setOptionIndex}
        />
      )}
    </div>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (): JSX.Element => (
  <Layout>
    <App />
  </Layout>
);
