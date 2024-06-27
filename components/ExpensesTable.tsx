import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IExpense } from "@/database/expense.model";
import { formatDate } from "@/lib/utils";

interface Props {
  expenses: IExpense[];
}

function ExpensesTable({ expenses }: Props) {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Expenses</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense, index) => (
          <TableRow key={index}>
            <TableCell>{formatDate(expense.createdAt)}</TableCell>
            <TableCell>{expense.name}</TableCell>
            <TableCell className="text-right">${expense.amount} </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ExpensesTable;
