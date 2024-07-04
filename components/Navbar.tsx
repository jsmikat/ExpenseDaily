import { UserButton } from "@clerk/nextjs";

function Navbar() {
  return (
    <div className="w-full mb-10 flex justify-between items-center">
      <div className="text-3xl font-bold">
        Expense<span className="text-primary-400">Tracker</span>
      </div>
      <div>
        <UserButton 
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: "h-8 w-8"
          }
        }}/>
      </div>
    </div>
  );
}

export default Navbar;
