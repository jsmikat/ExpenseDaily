"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Schema } from "mongoose";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import NewExpense from "./NewExpense";

interface Expenses {
  _id: string;
  name: string;
  amount: number;
  createdAt: Date;
  user: Schema.Types.ObjectId;
}

interface Props {
  expenses: Expenses[];
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
          <Dialog key={index}>
            <DialogTrigger asChild className="cursor-pointer">
              <TableRow>
                <TableCell>{formatDate(expense.createdAt)}</TableCell>
                <TableCell>{expense.name}</TableCell>
                <TableCell className="text-right">${expense.amount} </TableCell>
              </TableRow>
            </DialogTrigger>
            <DialogContent className="rounded-lg">
              <DialogHeader>
                <DialogTitle>
                  <h1>Edit</h1>
                </DialogTitle>
                <DialogDescription>
                  <p>You can edit your expenses</p>
                </DialogDescription>
              </DialogHeader>
              <NewExpense type="edit" expenseId={expense._id} />
            </DialogContent>
          </Dialog>
        ))}
      </TableBody>
    </Table>
  );
}

export default ExpensesTable;
