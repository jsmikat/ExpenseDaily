import { AreaChart } from "@/components/AreaChart";
import ExpensesTable from "@/components/ExpensesTable";
import Filters from "@/components/Filters";
import Navbar from "@/components/Navbar";
import NewExpense from "@/components/NewExpense";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getExpenses,
  getLast7DaysExpenses,
} from "@/lib/actions/expense.action";
import { generateLast7DaysData } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

async function Dashboard(Props: { searchParams: SearchParams }) {
  const searchParams = await Props.searchParams;
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const month = searchParams.month || (new Date().getMonth() + 1).toString();
  const year = searchParams.year || new Date().getFullYear().toString();

  const expenses = await getExpenses({ user: userId, month, year });
  const last7DaysExpenses = await getLast7DaysExpenses(userId);

  const recentExpenses = await generateLast7DaysData(last7DaysExpenses);

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
            <NewExpense type="create" />
          </div>
        </div>
        <div className="h-full border-dark-200 p-4 rounded-lg shadow-xs border-2">
          <div className="flex flex-col gap-2">
            <Filters />
            <ScrollArea className="w-full h-[480px]">
              {expenses!.length === 0 ? (
                <div className="mt-12 flex flex-col gap-2 items-center justify-center">
                  <Image
                    src="/empty-list.png"
                    height={300}
                    width={300}
                    alt="Empty List"
                  />
                  <h1 className="text-2xl font-bold">No Expenses Recorded</h1>
                  <p className="text-gray-500 text-center">
                    Start by adding a new expense to keep track of your
                    spending.
                  </p>
                </div>
              ) : (
                <ExpensesTable
                  expenses={JSON.parse(JSON.stringify(expenses)) || []}
                />
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
