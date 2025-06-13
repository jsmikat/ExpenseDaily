import { type ClassValue, clsx } from "clsx";
import { format, subDays } from "date-fns";
import { twMerge } from "tailwind-merge";
import { ExpenseParams } from "./actions/shared.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: Date): string {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });

  return `${day} ${month}`;
}

export async function generateLast7DaysData(
  last7DaysExpenses: ExpenseParams[]
) {
  const today = new Date();
  const expensesByDate: Record<string, number> = {};

  last7DaysExpenses.forEach((expense) => {
    if (!expense.createdAt) {
      return;
    }

    const expenseDate = new Date(expense.createdAt);

    if (isNaN(expenseDate.getTime())) {
      return;
    }

    const dateKey = format(expenseDate, "yyyy-MM-dd");

    if (!expensesByDate[dateKey]) {
      expensesByDate[dateKey] = 0;
    }
    expensesByDate[dateKey] += expense.amount;
  });

  const chartData = [];

  for (let i = 6; i >= 0; i--) {
    const targetDate = subDays(today, i);
    const dateKey = format(targetDate, "MMM dd");
    const lookupKey = format(targetDate, "yyyy-MM-dd");

    const totalAmount = expensesByDate[lookupKey] || 0;

    chartData.push({
      date: dateKey,
      amount: totalAmount,
    });
  }

  return chartData;
}
