import Expense from "@/database/expense.model";

async function totalExpensesForMonth(
  userId: string,
  year: number,
  month: number
) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  try {
    const result = await Expense.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $match: {
          "userDetails.clerkId": userId,
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: {
            $sum: "$amount",
          },
        },
      },
    ]);
    return result.length > 0 ? result[0].totalAmount : 0;
  } catch (err) {
    console.error(err);
  }
}

async function fetchTotalExpensesForMonth(
  userId: string,
  date: Date
): Promise<number> {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return totalExpensesForMonth(userId, year, month);
}

async function OnThisMonth({ userId, date }: { userId: string; date: Date }) {
  const total = await fetchTotalExpensesForMonth(userId, date);

  return (
    <div className="font-bold text-xl">
      Total This Month: <span className="text-danger-200">{total} Tk</span>
    </div>
  );
}

export default OnThisMonth;
