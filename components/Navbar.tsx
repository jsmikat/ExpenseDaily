import { UserButton } from "@clerk/nextjs";

function Navbar() {
  return (
    <div className="w-full mb-10 flex justify-between items-center">
      <div className="text-3xl font-bold">
        Expense<span className="text-red-700">Tracker</span>
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default Navbar;
