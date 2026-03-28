"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/auth-server";
import { Column } from "@/lib/models";
import connectDB from "@/lib/db";

export async function updateColumnName(columnId: string, name: string) {
  await connectDB();
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const column = await Column.findById(columnId);

  if (!column) {
    return { error: "Column not found" };
  }

  column.name = name;
  await column.save();

  revalidatePath("/dashboard");

  return { success: true };
}
