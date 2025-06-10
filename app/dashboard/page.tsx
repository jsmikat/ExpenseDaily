import { AreaChart } from "@/components/AreaChart";
import ExpensesTable from "@/components/ExpensesTable";
import Navbar from "@/components/Navbar";
import NewExpense from "@/components/NewExpense";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getExpenses } from "@/lib/actions/expense.action";
import { ExpenseParams } from "@/lib/actions/shared.types";
import { getUserById } from "@/lib/actions/user.action";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { format, subDays } from "date-fns";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function Dashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  const expenses = await getExpenses({ user: mongoUser._id });

  const recentExpenses = await generateLast7DaysData(expenses);

  return (
    <div className="w-screen py-8 px-8 lg:px-24">
      <Navbar />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-6">
          <div className="border-2 border-dark-200 p-8 rounded-lg shadow-xs">
            <Suspense fallback={<div>Loading...</div>}>
              <AreaChart
                data={recentExpenses}
                index="date"
                className="h-[250px]"
                categories={["amount"]}
                yAxisWidth={40}
                colors={["amber"]}
              />
            </Suspense>
          </div>
          <div className="border-2 border-dark-200 p-8 rounded-lg shadow-xs">
            <NewExpense
              mongoUserId={JSON.stringify(mongoUser?._id)}
              type="create"
            />
          </div>
        </div>
        <div
          className={cn("h-full border-dark-200 p-4 rounded-lg", {
            "shadow-xs": expenses!.length > 0,
            "border-2": expenses!.length > 0,
          })}
        >
          {expenses!.length === 0 ? (
            <div className="flex flex-col gap-2 items-center justify-center">
              <Image
                src="/empty-list.png"
                height={300}
                width={300}
                alt="Empty List"
              />
              <h1 className="text-2xl font-bold">No Expenses Recorded</h1>
              <p className="text-gray-500 text-center">
                Start by adding a new expense to keep track of your spending.
              </p>
            </div>
          ) : (
            <ScrollArea className="w-full px-4 h-[480px]">
              <ExpensesTable
                expenses={JSON.parse(JSON.stringify(expenses)) || []}
              />
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

async function generateLast7DaysData(expenses: ExpenseParams[]) {
  const today = new Date();
  const expensesByDate: Record<string, number> = {};

  expenses.forEach((expense, index) => {
    const expenseDate = new Date(expense.createdAt);

    // No timezone adjustment needed - already in Bangladesh time from DB
    const year = expenseDate.getFullYear();
    const month = String(expenseDate.getMonth() + 1).padStart(2, "0");
    const day = String(expenseDate.getDate()).padStart(2, "0");
    const dateKey = `${year}-${month}-${day}`;

    if (!expensesByDate[dateKey]) {
      expensesByDate[dateKey] = 0;
    }
    expensesByDate[dateKey] += expense.amount;
  });

  const chartData = [];

  for (let i = 6; i >= 0; i--) {
    const targetDate = subDays(today, i);
    const dateKey = format(targetDate, "MMM dd");

    // Use local date methods (no UTC conversion)
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, "0");
    const day = String(targetDate.getDate()).padStart(2, "0");
    const lookupKey = `${year}-${month}-${day}`;

    const totalAmount = expensesByDate[lookupKey] || 0;

    chartData.push({
      date: dateKey,
      amount: totalAmount,
    });
  }

  return chartData;
}
