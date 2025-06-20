"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createExpense, updateExpense } from "@/lib/actions/expense.action";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface props {
  mongoUserId?: string;
  type: "create" | "edit";
  expense?: {
    _id: string;
    name: string;
    amount: number;
    createdAt: Date;
    paymentMethod: string;
    user: string;
  };
}

const formSchema = z.object({
  expenseName: z
    .string()
    .min(2, { message: "Expense name must be at least 2 characters long" }),
  amount: z.coerce.number({ message: "Amount must be a number" }),
  paymentMethod: z.string(),
  date: z.date(),
});

function NewExpense({ type, expense }: props) {
  const { userId } = useAuth();
  const router = useRouter();
  const path = usePathname();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expenseName: expense?.name || "",
      amount: expense?.amount || 0,
      paymentMethod: expense?.paymentMethod || "Cash",
      date: expense?.createdAt ? new Date(expense.createdAt) : new Date(),
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (type === "create" && userId) {
      try {
        const adjustedDate = new Date(data.date);
        adjustedDate.setHours(6, 0, 0, 0);
        await createExpense({
          name: data.expenseName,
          amount: data.amount,
          paymentMethod: data.paymentMethod,
          user: userId,
          createdAt: adjustedDate,
          path,
        });
        form.reset();
        router.refresh();
      } catch (error) {
        console.error("⚠️Error submitting expense: ", error);
      }
    }

    if (type === "edit" && expense) {
      try {
        const adjustedDate = new Date(data.date);
        adjustedDate.setHours(6, 0, 0, 0);
        await updateExpense({
          expenseId: expense._id,
          name: data.expenseName,
          amount: data.amount,
          paymentMethod: data.paymentMethod,
          createdAt: data.date,
          path,
        });
      } catch (error) {
        console.error("⚠️Error updating expense: ", error);
      }
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 lg:space-y-8"
        >
          <FormField
            control={form.control}
            name="expenseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expense Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the expense name (e.g., Groceries, Rent, Utilities)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter the amount spent (e.g., 50.00)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 flex-col lg:flex-row items-center justify-between">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Payment Method</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Card">Card</SelectItem>
                      <SelectItem value="Bank Transfer">
                        Bank Transfer
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel className="my-1">Date of Expense</FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PP")
                          ) : (
                            <span>Pick a date</span>
                          )}

                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(e) => {
                          field.onChange(e);
                        }}
                        disabled={(date: Date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>

          <Button
            className="w-full bg-primary-400 hover:bg-primary-200 cursor-pointer"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? type === "create"
                ? "Adding..."
                : "Updating..."
              : type === "create"
              ? "Add Expense"
              : "Update Expense"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default NewExpense;
