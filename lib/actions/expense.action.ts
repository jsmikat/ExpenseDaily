"use server";

import Expense from "@/database/expense.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { CreateExpenseParams, GetExpensesParams } from "./shared.types";

export async function createExpense(params: CreateExpenseParams) {
  try {
    await connectToDatabase();
    const { name, amount, paymentMethod, user, path } = params;
    const expense = await Expense.create({
      name,
      amount,
      paymentMethod,
      user,
    });
    revalidatePath(path);
  } catch (error) {
    console.log("⚠️Error creating expense");
  }
}

export async function getExpenses(params: GetExpensesParams) {
  try {
    await connectToDatabase();
    const { user } = params;
    const expenses = await Expense.find({ user: user });
    return expenses;
  } catch (error) {
    console.log("⚠️Error getting expenses");
  }
}
