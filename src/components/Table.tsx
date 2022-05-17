import { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ResultContext } from "../contexts/ResultContext";
import { Row } from "../types";

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

export default function SpanningTable() {
  const { contextState } = useContext(ResultContext);
  const { amount, rows, isLeft } = contextState;

  function total(items: readonly Row[]) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }
  const invoiceSubtotal = total(rows);
  const style = {
    color:
      invoiceSubtotal !== amount && !isLeft
        ? invoiceSubtotal < amount
          ? "green"
          : "red"
        : "",
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Class</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.class}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">${ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2} style={style}>
              Total
            </TableCell>
            <TableCell align="right" style={style}>
              ${ccyFormat(invoiceSubtotal)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
