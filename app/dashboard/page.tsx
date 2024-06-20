import Navbar from "@/components/Navbar";
import NewExpense from "@/components/NewExpense";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Dashboard() {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ userId });
  console.log("💀MongoUser:", mongoUser)

  return (
    <div className="w-full p-8">
      <Navbar />
      <NewExpense mongoUserId={JSON.stringify(mongoUser?._id)} />
    </div>
  );
}

export default Dashboard;
