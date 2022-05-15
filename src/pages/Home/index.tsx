import { useEffect, useState } from "react";
import Question from "../../components/Question";
import { QuestionProps, questions } from "../../utils/questions";

const Home = (): JSX.Element => {
  let initial: QuestionProps = {
    id: 0,
    question: "",
    options: [],
    prices: [],
  };
  const [prices] = useState<number[]>([]);
  const [questionsBank, setQuestionsBank] = useState<QuestionProps[]>([]);
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionProps>(initial);
  const [chosenAnwser, setChosenAnwser] = useState<string>("");
  const [questionNum, setQuestionNum] = useState(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [optionIndex, setOptionIndex] = useState<number>();
  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState<number>(0);

  // Price Calculation against each question
  const calculatePrice = (questionIndex: number, answerIndex: number) => {
    switch (questionIndex) {
      case 2:
      case 3:
      case 4:
      case 7:
      case 8:
        prices.push(questionsBank[questionIndex].prices![answerIndex]);
        return;
      case 9:
        const allPrices = prices.reduce((total, currentValue) => (total = total + currentValue),0);
        setResult(allPrices * questionsBank[questionIndex].prices![answerIndex]);
        return;
      default:
        return;
    }
  };

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
        setShowResult(true);
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
          setShowResult(true);
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
  }, [questionsBank, questionNum, isAnswered, optionIndex]);

  return (
    <div>
      {currentQuestion && (
        <Question
          result={result}
          showResult={showResult}
          question={currentQuestion}
          setIsAnswered={setIsAnswered}
          setChosenAnwser={setChosenAnwser}
          setOptionIndex={setOptionIndex}
        />
      )};
    </div>
  );
};

export default Home;
