export interface QuestionProps {
  id: number;
  question: string;
  options: string[];
  prices?: number[];
  next?: number;
  skipTo?: number;
}
const Category = ["Economy", "Standard", "Premium"];
export const questions = [
  {
    id: 1,
    question: "Do you have Budget?",
    options: ["Yes", "No"],
    next: 1,
  },
  {
    id: 2,
    question: "Are you changing Sanitary Products?",
    options: ["Yes", "No"],
    next: 2,
    skipTo: 5,
  },
  {
    id: 3,
    question: "Select your Toilet.",
    options: Category,
    prices: [200, 1000, 3000],
    next: 3,
  },
  {
    id: 4,
    question: "Select your Skin.",
    options: Category,
    prices: [350, 700, 1500],
    next: 4,
  },
  {
    id: 5,
    question: "Select your Bathtub.",
    options: Category,
    prices: [800, 1500, 4650],
    next: 5,
  },
  {
    id: 6,
    question: "Are you changing your floor tiling?",
    options: ["Yes", "No"],
    next: 6,
    skipTo: 10,
  },
  {
    id: 7,
    question:
      "Do you prefer Ceramic or Marble floor tiling?                                                                                                            ",
    options: ["Ceramic", "Marble"],
    next: 7,
    skipTo: 8,
  },
  {
    id: 8,
    question:
      "Choose your Ceramic?                                                                                                            ",
    options: Category,
    prices: [15, 35, 75],
    next: 9,
  },
  {
    id: 9,
    question:
      "Choose your Marble Flooring?                                                                                                            ",
    options: Category,
    prices: [50, 95, 150],
    next: 9,
  },
  {
    id: 10,
    question:
      "What is the size of your Bathroom?                                                                                                            ",
    options: ["Small", "Medium", "Large"],
    prices: [9, 12, 16],
    skipTo: 10,
  },
];
