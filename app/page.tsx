import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full h-screen p-8 flex flex-col gap-4 items-center justify-center">
      <h1 className="heading-1">Welcome to FlowCount</h1>
      <p className="paragraph mx-12 text-center">
        FlowCount is a simple expense tracker that helps you keep track of your
        expenses.
      </p>
      <Link href="/dashboard">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
};

export default page;
