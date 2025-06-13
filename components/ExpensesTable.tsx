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
import { cn } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  user: string;
}

interface Props {
  expenses: Expenses[];
}

function ExpensesTable({ expenses }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
                <TableCell>
                  {format(new Date(expense.createdAt), "MMM dd")}
                </TableCell>
                <TableCell>{expense.name}</TableCell>
                <TableCell className="text-right">
                  {expense.amount} tk
                </TableCell>
              </TableRow>
            </DialogTrigger>
            <DialogContent className="w-[320px] sm:w-[420px] md:w-full rounded-lg">
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
                  onClick={async () => {
                    setIsSubmitting(true);
                    await deleteExpense({ expenseId: expense._id, path });
                    setIsSubmitting(false);
                  }}
                  disabled={isSubmitting}
                  className={cn("bg-danger-400", isSubmitting && "opacity-50")}
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
