"use client";

import { SignInButton } from "@clerk/nextjs";
import {
  CalendarRange,
  CheckCircle2,
  LineChart,
  Lock,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Expense Daily — Track spending in seconds",
  description:
    "A dead-simple daily expense tracker that turns your entries into weekly & monthly insights. Start free in seconds.",
};

export default function Page() {
  return (
    <main className="min-h-dvh bg-[radial-gradient(70%_60%_at_50%_-10%,theme(colors.primary-200)/20%,transparent_60%),linear-gradient(to_bottom,transparent,theme(colors.dark-400)/3%)] text-dark-400 dark:text-dark-200">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-3xl font-bold">
              Expense<span className="text-primary-400">Daily</span>
            </div>
          </Link>

          <SignInButton mode="modal">
            <button className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-dark-400/10 bg-dark-200/40 hover:bg-dark-200/70 dark:bg-light-200/30 dark:hover:bg-light-200/50">
              <span>Sign in</span>
            </button>
          </SignInButton>
        </div>
      </header>

      {/* Hero */}
      <section className="container grid lg:grid-cols-2 gap-10 py-16 lg:py-24 items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-dark-400/10 px-3 py-1 text-xs font-medium text-light-200 dark:text-dark-200/80">
            <TrendingUp className="size-3.5" />
            Make better money moves in minutes a day
          </p>
          <h1 className="heading-1 leading-tight">
            Know where your money goes{" "}
            <span className="text-primary-400 inline-block">every day</span>.
          </h1>
          <p className="paragraph max-w-prose text-light-200 dark:text-dark-200/80">
            Log today&apos;s spend in seconds. Your entries automatically become
            clean weekly and monthly trend lines so you spot overspending before
            it hurts.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <SignInButton mode="modal">
              <button className="rounded-xl px-5 py-3 font-semibold bg-primary-400 text-dark-400 hover:brightness-95">
                Start free — it takes 10s
              </button>
            </SignInButton>
            <a
              href="#demo"
              className="rounded-xl px-5 py-3 font-semibold ring-1 ring-dark-400/10 hover:bg-dark-200/40"
            >
              See live demo
            </a>
          </div>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-light-200 dark:text-dark-200/70">
            <li className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary-400" />
              No credit card
            </li>
            <li className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary-400" />
              Private by default
            </li>
            <li className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary-400" />
              Desktop & mobile
            </li>
          </ul>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 blur-3xl opacity-40 bg-[radial-gradient(40%_40%_at_70%_20%,theme(colors.primary-200),transparent_60%)]" />
          <div className="rounded-2xl border border-dark-400/10 bg-white/70 dark:bg-black/40 shadow-xl overflow-hidden">
            <Image
              src="/ExpenseDaily.png"
              alt="Expense Daily app screenshot"
              width={1400}
              height={900}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="container py-4">
        <p className="text-center text-sm text-light-200 dark:text-dark-200/60">
          Made for students, freelancers, and busy families who want clarity
          without spreadsheets.
        </p>
      </section>

      {/* Features */}
      <section
        id="features"
        className="container py-16 grid md:grid-cols-3 gap-6"
      >
        <Feature
          icon={<CalendarRange className="size-5" />}
          title="Daily entry in 10 seconds"
          desc="Add today's total once. No categories if you don't want them. The point is consistency, not bookkeeping."
        />
        <Feature
          icon={<LineChart className="size-5" />}
          title="Weekly & monthly trends"
          desc="Your expenses auto-plot into a line graph so you instantly compare this week vs last, or month over month."
        />
        <Feature
          icon={<Lock className="size-5" />}
          title="Yours, not your bank's"
          desc="Sign in securely with Clerk. We don't connect to your bank or sell data—entries stay in your account."
        />
      </section>

      {/* Demo */}
      <section id="demo" className="container py-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <h2 className="heading-1">Try the flow before you commit</h2>
          <p className="paragraph text-light-200 dark:text-dark-200/80">
            Open the app demo, add a sample expense, and watch the chart update
            in real time.
          </p>
          <SignInButton mode="modal">
            <button className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold bg-primary-400 text-dark-400 hover:brightness-95">
              <Sparkles className="size-4" />
              Launch interactive demo
            </button>
          </SignInButton>
        </div>
      </section>

      {/* Roadmap / SaaS framing */}
      <section className="container py-16 grid lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          <h3 className="heading-1">What&apos;s coming next</h3>
          <p className="paragraph text-light-200 dark:text-dark-200/80">
            We&apos;re building the lightest personal finance SaaS. Today is
            about daily clarity. Next is about control.
          </p>
          <ul className="grid gap-3 text-sm">
            <li className="flex items-start gap-2">
              <CheckBullet />
              Budgets & gentle alerts when you drift over target.
            </li>
            <li className="flex items-start gap-2">
              <CheckBullet />
              Category breakdowns and simple notes per day.
            </li>
            <li className="flex items-start gap-2">
              <CheckBullet />
              Share read-only reports with a partner or coach.
            </li>
            <li className="flex items-start gap-2">
              <CheckBullet />
              Optional CSV export for accountants.
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-dark-400/10 p-6 bg-white/70 dark:bg-black/40">
          <h4 className="text-lg font-semibold mb-2">Early Access</h4>
          <p className="text-sm text-light-200 dark:text-dark-200/70 mb-4">
            Join the early list to shape what ships next. You&apos;ll get
            feature previews and founder Q&amp;A.
          </p>
          <SignInButton mode="modal">
            <button className="w-full rounded-xl px-5 py-3 font-semibold bg-primary-400 text-dark-400 hover:brightness-95">
              Join the waitlist
            </button>
          </SignInButton>
          <p className="mt-3 text-xs text-light-200 dark:text-dark-200/60">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-16">
        <h3 className="heading-1 text-center mb-8">Questions, answered</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <FAQ
            q="Is it really free?"
            a="Yes. While we build paid features, the core daily tracking stays free for early users."
          />
          <FAQ
            q="Do you read my bank data?"
            a="No. You enter a single number per day. We don't connect to banks or sell data."
          />
          <FAQ
            q="Can I export my data?"
            a="Export is on the roadmap. You'll always be able to take your data with you."
          />
          <FAQ
            q="Mobile friendly?"
            a="Absolutely. The interface is tuned for quick thumb entry on phones and clarity on desktop."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-400/10">
        <div className="container py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-light-200 dark:text-dark-200/70">
          <p>© {new Date().getFullYear()} Expense Daily</p>
          <div className="flex items-center gap-6">
            <Link href="#features" className="hover:underline">
              Features
            </Link>
            <Link href="#demo" className="hover:underline">
              Demo
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-dark-400/10 p-6 bg-white/70 dark:bg-black/40">
      <div className="flex items-center gap-2 text-primary-400">
        {icon}
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="mt-2 text-sm text-light-200 dark:text-dark-200/80">
        {desc}
      </p>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-dark-400/10 p-6 bg-white/70 dark:bg-black/40">
      <h5 className="font-semibold">{q}</h5>
      <p className="mt-2 text-sm text-light-200 dark:text-dark-200/80">{a}</p>
    </div>
  );
}

function CheckBullet() {
  return (
    <span className="mt-1 inline-grid place-items-center rounded-full border border-dark-400/10 bg-dark-200/30 dark:bg-light-200/20 size-5">
      <CheckCircle2 className="size-3 text-primary-400" />
    </span>
  );
}
