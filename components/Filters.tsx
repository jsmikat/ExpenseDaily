"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  if (!user) return null;
  const userCreatedYear = new Date(user.createdAt!).getFullYear();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const years = [];
  for (let year = userCreatedYear; year <= currentYear; year++) {
    years.push(year);
  }

  return (
    <div className="flex gap-2">
      <Select
        onValueChange={(value) => {
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.set("year", value);
          router.push(`${pathname}?${searchParams.toString()}`);
        }}
        defaultValue={currentYear.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => {
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.set("month", value);
          router.push(`${pathname}?${searchParams.toString()}`);
        }}
        defaultValue={currentMonth.toString()}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">January</SelectItem>
            <SelectItem value="2">February</SelectItem>
            <SelectItem value="3">March</SelectItem>
            <SelectItem value="4">April</SelectItem>
            <SelectItem value="5">May</SelectItem>
            <SelectItem value="6">June</SelectItem>
            <SelectItem value="7">July</SelectItem>
            <SelectItem value="8">August</SelectItem>
            <SelectItem value="9">September</SelectItem>
            <SelectItem value="10">October</SelectItem>
            <SelectItem value="11">November</SelectItem>
            <SelectItem value="12">December</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Filters;
