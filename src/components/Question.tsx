import React, { useContext } from "react";
import { CssBaseline, Box, Typography, Container } from "@mui/material";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Button,
} from "@mui/material";

import { QuestionProps } from "../types";
import { ResultContext } from "../contexts/ResultContext";

function Question({
  question,
  handleChosenAnswer,
}: {
  question: QuestionProps;
  handleChosenAnswer: Function;
}) {
  const { contextState, updateContextState } = useContext(ResultContext);
  const { amount, showResult } = contextState;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateContextState("amount", event.target.value);
  };

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
        {!showResult && (
          <>
            <Typography component="h1" variant="h4">
              {question?.question}
            </Typography>

            <FormControl sx={{ m: 4 }}>
              {question?.id === 1 && (
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
                {question?.options.map((option: string, index: number) => (
                  <Button
                    key={option}
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{ mt: 2 }}
                    onClick={() => handleChosenAnswer(option, index)}
                  >
                    {question?.showValue ? question?.showValue[index] : option}
                  </Button>
                ))}
              </Box>
            </FormControl>
          </>
        )}
      </Box>
    </Container>
  );
}

export default Question;
