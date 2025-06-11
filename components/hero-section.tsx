import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { RiGithubFill } from "@remixicon/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HeroSection() {
  return (
    <>
      <main className="overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
        >
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section>
          <div className="relative pt-24 md:pt-36">
            <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"></div>
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    href="#hero-image"
                    className="hover:bg-white dark:hover:border-t-border bg-slate-100 group mx-auto flex w-fit items-center gap-4 rounded-full border border-slate-200 p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 "
                  >
                    <span className="text-slate-950 text-sm">
                      Check Out The Interface
                    </span>
                    <span className="dark:border-white block h-4 w-0.5 border-l bg-white dark:bg-zinc-700 dark:dark:border-slate-950"></span>

                    <div className="bg-white group-hover:bg-slate-100 size-6 overflow-hidden rounded-full duration-500 dark:bg-slate-950 dark:group-hover:bg-slate-800">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedGroup>

                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="font-bold mt-8 text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]"
                >
                  Manage Your Expenses Effortlessly.
                </TextEffect>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-8 max-w-2xl text-balance text-lg"
                >
                  Take control of your finances with our open-source expense
                  tracker.
                </TextEffect>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col gap-2 items-center justify-center md:flex-row"
                >
                  <Button
                    key={1}
                    asChild
                    size="lg"
                    className="bg-amber-400 rounded-xl px-5 text-base"
                  >
                    <Link href="/dashboard">
                      <span className="text-nowrap">Get Started</span>
                    </Link>
                  </Button>

                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-10.5 rounded-xl px-5"
                  >
                    <Link className="flex gap-2" href="https://github.com/jsmikat/ExpenseDaily">
                      <RiGithubFill />
                      <span className="text-nowrap">Github Repo.</span>
                    </Link>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              className="mb-8"
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 my-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div
                  aria-hidden
                  className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                />
                <div
                  id="hero-image"
                  className="inset-shadow-2xs mb-8 ring-white bg-white relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 p-4 shadow-lg shadow-zinc-950/15 ring-1"
                >
                  <Image
                    className="z-2 border-slate-200/25 relative rounded-2xl border"
                    src="/ExpenseDaily.png"
                    alt="app screen"
                    width="2880"
                    height="1800"
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
      </main>
    </>
  );
}
