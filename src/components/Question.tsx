import React, { useEffect } from "react";
import { CssBaseline, Box, Typography, Container } from "@mui/material";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Button,
} from "@mui/material";
import { QuestionProps } from "../utils/questions";

function Question({
  result,
  showResult,
  question,
  setIsAnswered,
  setChosenAnwser,
  setOptionIndex,
}: {
  result: number;
  showResult: boolean;
  question: QuestionProps;
  setIsAnswered: (isAnswer: boolean) => void;
  setChosenAnwser: (chosenAnswer: string) => void;
  setOptionIndex: (optionIndex: number) => void;
}) {
  const [amount, setAmount] = React.useState<any>(0);
  const [isLeft, setIsLeft] = React.useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };
  const handleChosenAnswer = (option: string, index: number) => {
    if (question.id === 1 && option === "No") {
      setIsLeft(true);
      return;
    } else if (question.id === 1 && (isNaN(+amount) || amount <=0)) {
      return;
    }

    setOptionIndex(index);
    setChosenAnwser(option);
    setIsAnswered(true);
  };

  useEffect(() => {
    setChosenAnwser("");
    setIsAnswered(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 25,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!showResult && !isLeft && (
          <>
            <Typography component="h1" variant="h4">
              {question.question}
            </Typography>

            <FormControl sx={{ m: 4 }}>
              {question.id === 1 && (
                <>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Amount
                  </InputLabel>
                  <OutlinedInput
                    placeholder="Enter Budget Amount"
                    required={true}
                    id="outlined-adornment-amount"
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                    error={!amount}
                  />
                </>
              )}
              <Box mx={3} pt={2}>
                {question.options.map((option: string, index: number) => (
                  <Button
                    key={option}
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{ mt: 2 }}
                    onClick={() => handleChosenAnswer(option, index)}
                  >
                    {question.showValue? question.showValue[index] : option}
                  </Button>
                ))}
              </Box>
            </FormControl>
          </>
        )}
        {(showResult || isLeft) && (
          <Typography
            component="h1"
            variant="h4"
            style={{ color: (result != amount && !isLeft) ? 
              result < amount ? "green" : "red" :
              ''
             }}
          >
            Result {result}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default Question;
