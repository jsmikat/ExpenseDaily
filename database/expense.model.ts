import { Document, model, models, Schema } from "mongoose";

export interface IExpense extends Document {
  name: string;
  amount: number;
  paymentMethod: string;
  createAt: Date;
  user: Schema.Types.ObjectId;
}

const ExpenseSchema = new Schema<IExpense>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Expense = models.Expense || model<IExpense>("Expense", ExpenseSchema);

export default Expense;