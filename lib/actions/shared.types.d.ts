import { IUser } from "@/database/user.model";

export interface CreateExpenseParams {
  name: string;
  amount: number;
  paymentMethod: string;
  user: string | null;
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
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}
