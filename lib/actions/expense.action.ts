"use server";

import Expense from "@/database/expense.model";
import { startOfDay, subDays } from "date-fns";
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
    const { expenses, createdAt, user, path } = params;
    const expenseDocs = expenses.map((expense) => ({
      name: expense.expenseName,
      amount: expense.amount,
      paymentMethod: expense.paymentMethod,
      user,
      createdAt,
    }));
    await Expense.insertMany(expenseDocs);
    revalidatePath(path);
  } catch (error) {
    console.error("⚠️Error creating expense:", error);
    throw error;
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
      createdAt,
    });
    revalidatePath(path);
  } catch (error) {
    console.error("⚠️Error updating expense:", error);
    throw error;
  }
}

export async function deleteExpense(params: DeleteExpenseParams) {
  try {
    await connectToDatabase();
    const { expenseId, path } = params;
    await Expense.findByIdAndDelete(expenseId);
    revalidatePath(path);
  } catch (error) {
    console.error("⚠️Error deleting expense:", error);
    throw error;
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
    console.error("⚠️Error getting expenses:", error);
    throw error;
  }
}

export async function getLast7DaysExpenses(user: string) {
  try {
    await connectToDatabase();
    const today = new Date();
    const sevenDaysAgo = startOfDay(subDays(today, 6));
    const expenses = await Expense.aggregate([
      {
        $match: {
          user: user,
          createdAt: {
            $gte: sevenDaysAgo,
          },
        },
      },
      {
        $sort: { createdAt: 1 },
      },
    ]);
    return JSON.parse(JSON.stringify(expenses));
  } catch (error) {
    console.error("⚠️Error getting last 7 days expenses:", error);
    throw error;
  }
}
