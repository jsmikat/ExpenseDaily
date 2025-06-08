import ExpensesTable from "@/components/ExpensesTable";
import Navbar from "@/components/Navbar";
import NewExpense from "@/components/NewExpense";
import OnThisMonth from "@/components/OnThisMonth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getExpenses } from "@/lib/actions/expense.action";
import { getUserById } from "@/lib/actions/user.action";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Dashboard() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  const expenses = await getExpenses({ user: mongoUser._id });
  const today = new Date();

  return (
    <div className="w-screen py-8 px-8 lg:px-24">
      <Navbar />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-6">
          <div className="border-2 border-dark-200 p-8 rounded-lg shadow-sm">
            <OnThisMonth
              userId={mongoUser?.clerkId}
              date={today}
            />
          </div>
          <div className="border-2 border-dark-200 p-8 rounded-lg shadow-sm">
            <NewExpense
              mongoUserId={JSON.stringify(mongoUser?._id)}
              type="create"
            />
          </div>
        </div>
        <div
          className={cn("h-full border-dark-200 p-4 rounded-lg", {
            "shadow-sm": expenses!.length > 0,
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
