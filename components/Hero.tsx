import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Hero() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Manage Your Expenses Effortlessly with Our Next.js 14 Powered App
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Take control of your finances with our open-source expense tracker.
            Follow our journey as we develop and refine this powerful tool.
          </p>
          <div className="space-x-4">
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-primary-400 hover:bg-primary-200"
              )}
            >
              Get Started
            </Link>
            <Link
              href={"https://github.com/jsmikat/Expense-tracker"}
              target="_blank"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "outline-primary-400"
              )}
            >
              View on GitHub
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
