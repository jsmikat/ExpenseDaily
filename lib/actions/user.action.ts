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
    connectToDatabase();
    const newUser = await User.create(userData);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error creating user: ", error);
  }
}

export async function updateUser(userData: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData} = userData;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
  } catch (error) {
    console.error("Error updating user: ", error);
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    await Expense.deleteMany({ user: user._id });

    await User.findByIdAndDelete(user._id);

    return user;
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  }
}

export async function getUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("⚠️Error getting user by ID: ", error);
  }
}
