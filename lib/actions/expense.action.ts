"use server";

import Expense from "@/database/expense.model";
import { connectToDatabase } from "../mongoose";
import { CreateExpenseParams } from "./shared.types";

export async function createExpense(params: CreateExpenseParams) {
  try {
    await connectToDatabase();
    const { name, amount, paymentMethod, user } = params;
    const expense = await Expense.create({
      name,
      amount,
      paymentMethod,
      user,
    });
  } catch (error) {}
  console.log("⚠️Error creating expense");
}
