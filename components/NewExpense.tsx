"use client";

import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createExpense } from "@/lib/actions/expense.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type props = {
  mongoUserId: string;
};

const formSchema = z.object({
  expenseName: z
    .string()
    .min(2, { message: "Expense name must be at least 2 characters long" }),
  amount: z
    .number()
    .min(0, { message: "Amount must be a non-negative number" }),
  paymentMethod: z.enum(["Cash", "Card", "Bank Transfer", "Other"]),
});

const NewExpense = ({ mongoUserId }: props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await createExpense({
        name: data.expenseName,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        user: JSON.parse(mongoUserId),
      });
    } catch (error) {
      console.error("⚠️Error submitting expense: ", error);
      throw error;
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="expenseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expense Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder=" Enter the expense name (e.g., Groceries, Rent, Utilities)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <div className="flex flex-row gap-4 md:flex-col"> */}
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
                    // This is to change the inserted sting into number
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Card">Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* </div> */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default NewExpense;
