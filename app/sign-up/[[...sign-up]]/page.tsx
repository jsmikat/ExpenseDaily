import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-screen px-12 xl:px-32 py-12 md:py-6 flex items-center justify-center md:justify-between gap-4">
      <div className="hidden md:block">
        <Image src="/signup-bro.svg" alt="Sign up" width={600} height={600} />
      </div>

      <SignUp />
    </div>
  );
}
