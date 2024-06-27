import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: Date): string {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Extract the day and month from the Date object
  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });

  // Return the formatted date string
  return `${day} ${month}`;
}
