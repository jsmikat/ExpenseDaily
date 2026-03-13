"use server";

import Expense from "@/database/expense.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";

export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create(userData);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
}

export async function updateUser(userData: UpdateUserParams) {
  try {
    await connectToDatabase();
    const { clerkId, updateData} = userData;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
  } catch (error) {
    console.error("Error updating user: ", error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectToDatabase();
    const { clerkId } = params;

    await Expense.deleteMany({ user: clerkId });

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  }
}

export async function getUserById(params: { userId: string }) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("⚠️Error getting user by ID: ", error);
    throw error;
  }
}
