import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-screen px-12 xl:px-32 flex items-center justify-center">
      <SignIn />
    </div>
  );
}
