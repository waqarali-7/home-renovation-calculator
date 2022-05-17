export interface Row {
  desc: string;
  class: string;
  price: number;
  tile?: boolean;
  size?: boolean;
}
export interface QuestionProps {
  id: number;
  question: string;
  options: string[];
  desc?: string;
  showValue?: string[];
  prices?: number[];
  next?: number;
  skipTo?: number;
  showResult?: boolean;
  tile?: boolean;
  size?: boolean;
  isLeft?: boolean;
}
export interface ContextState {
  isLeft: boolean;
  showResult: boolean;
  amount: number;
  rows: Row[];
}

export interface LocalStateProps {
  questionNum: number;
  currentQuestion: QuestionProps;
  questionsBank: QuestionProps[];
  tileQuestion: Row;
}
