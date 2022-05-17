import { createContext } from "react";
import { rowInitial } from "../utils/initials";
import { Row, ContextState } from "../types";

export const ResultContext = createContext<{
  contextState: ContextState;
  updateContextState: (key: any, val: any) => void;
  addRows: (rows: Row[], row: Row) => void;
}>({
  contextState: {
    amount: 0,
    isLeft: false,
    showResult: false,
    rows: [rowInitial],
  },
  updateContextState: () => {},
  addRows: () => {},
});
