"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteExpense } from "@/lib/actions/expense.action";
import { formatDate } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Schema } from "mongoose";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NewExpense from "./NewExpense";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface Expenses {
  _id: string;
  name: string;
  amount: number;
  createdAt: Date;
  paymentMethod: string;
  user: Schema.Types.ObjectId;
}

interface Props {
  expenses: Expenses[];
}

function ExpensesTable({ expenses }: Props) {
  const path = usePathname();
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
                <TableCell className="text-right">
                  {expense.amount} tk
                </TableCell>
              </TableRow>
            </DialogTrigger>
            <DialogContent className="w-[420px] md:w-full rounded-lg">
              <DialogHeader>
                <DialogTitle>
                  <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    Edit Expense
                  </h1>
                </DialogTitle>
                <DialogDescription>
                  <p>Update Your Expense Details Below</p>
                </DialogDescription>
              </DialogHeader>
              <NewExpense type="edit" expense={expense} />
              <DialogClose asChild>
                <Button
                  onClick={async () =>
                    await deleteExpense({ expenseId: expense._id, path })
                  }
                  className="bg-danger-400"
                >
                  Delete
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        ))}
      </TableBody>
    </Table>
  );
}

export default ExpensesTable;
