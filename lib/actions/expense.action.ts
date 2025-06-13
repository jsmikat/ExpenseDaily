"use server";

import Expense from "@/database/expense.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreateExpenseParams,
  DeleteExpenseParams,
  GetExpensesParams,
  UpdateExpenseParams,
} from "./shared.types";

export async function createExpense(params: CreateExpenseParams) {
  try {
    await connectToDatabase();
    const { name, amount, paymentMethod, createdAt, user, path } = params;
    await Expense.create({
      name,
      amount,
      paymentMethod,
      user,
      createdAt,
    });
    revalidatePath(path);
  } catch (error) {
    console.log("⚠️Error creating expense");
  }
}

export async function updateExpense(params: UpdateExpenseParams) {
  try {
    await connectToDatabase();
    const { expenseId, name, amount, paymentMethod, createdAt, path } = params;
    await Expense.findByIdAndUpdate(expenseId, {
      name,
      amount,
      paymentMethod,
      createdAt, // Assuming you want to update the createdAt to now
    });
    revalidatePath(path);
  } catch (error) {
    console.log("⚠️Error updating expense");
  }
}

export async function deleteExpense(params: DeleteExpenseParams) {
  try {
    await connectToDatabase();
    const { expenseId, path } = params;
    await Expense.findByIdAndDelete(expenseId);
    revalidatePath(path);
  } catch (error) {
    console.log("⚠️Error deleting expense");
  }
}

export async function getExpenses(params: GetExpensesParams) {
  try {
    await connectToDatabase();
    const { user, month, year } = params;
    const expenses = await Expense.aggregate([
      {
        $match: {
          user: user,
          $expr: {
            $and: [
              { $eq: [{ $year: "$createdAt" }, parseInt(year)] },
              { $eq: [{ $month: "$createdAt" }, parseInt(month)] },
            ],
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
    return JSON.parse(JSON.stringify(expenses));
  } catch (error) {
    console.log("⚠️Error getting expenses");
  }
}

export async function getLast7DaysExpenses(user: string) {
  try {
    await connectToDatabase();
    const today = new Date();
    const expenses = await Expense.aggregate([
      {
        $match: {
          user: user,
          createdAt: {
            $gte: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() - 6
            ),
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    return JSON.parse(JSON.stringify(expenses));
  } catch (error) {
    console.log("⚠️Error getting last 7 days expenses");
  }
}
