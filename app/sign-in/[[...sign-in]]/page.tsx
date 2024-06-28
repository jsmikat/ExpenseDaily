import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full h-screen px-12 xl:px-32 flex items-center justify-center md:justify-between gap-4">
      <div className="hidden md:block">
        <Image src="/login-bro.svg" alt="Sign up" width={500} height={500} />
      </div>

      <SignIn />
    </div>
  );
}
