import { Document, model, models, Schema } from "mongoose";

export interface IExpense extends Document {
  name: string;
  amount: number;
  paymentMethod: string;
  createdAt: Date;
  user: string;
}

const ExpenseSchema = new Schema<IExpense>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: String, required: true },
});

const Expense = models.Expense || model<IExpense>("Expense", ExpenseSchema);

export default Expense;
