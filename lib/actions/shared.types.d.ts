import { IUser } from "@/database/user.model";

export interface CreateExpenseParams {
  name: string;
  amount: number;
  paymentMethod: string;
  user: string | null;
  createdAt: Date;
  path: string;
}

export interface ExpenseParams {
  _id: string;
  name: string;
  amount: number;
  paymentMethod: string;
  createdAt: Date;
  user: string;
}

export interface UpdateExpenseParams {
  expenseId: string;
  name: string;
  amount: number;
  paymentMethod: string;
  createdAt: Date;
  path: string;
}

export interface DeleteExpenseParams {
  expenseId: string;
  path: string;
}
export interface GetExpensesParams {
  user: string;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  email: string;
  picture: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
}

export interface DeleteUserParams {
  clerkId: string;
}
