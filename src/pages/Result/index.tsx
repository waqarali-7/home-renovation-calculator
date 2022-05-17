import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CssBaseline, Box, Container } from "@mui/material";
import SpanningTable from "../../components/Table";
import { ResultContext } from "../../contexts/ResultContext";
const Result = (): JSX.Element => {
  const { contextState } = useContext(ResultContext);
  const { showResult } = contextState;
  const navigate = useNavigate();
  useEffect(() => {
    if (!showResult) {
      navigate("/");
    }
  }, [showResult, navigate]);
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SpanningTable />
      </Box>
    </Container>
  );
};

export default Result;
