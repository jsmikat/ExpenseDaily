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
    const { user } = params;
    const expenses = await Expense.find({ user: user });
    return JSON.parse(JSON.stringify(expenses));
  } catch (error) {
    console.log("⚠️Error getting expenses");
  }
}
