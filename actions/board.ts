"use server";

import { getSession } from "@/lib/auth/auth-server";
import connectDB from "@/lib/db";
import { Board, Column, JobApplication } from "@/lib/models";
import { revalidatePath } from "next/cache";

export async function clearBoardJobs() {
  await connectDB();

  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const board = await Board.findOne({
    userId: session.user.id,
    name: "Job Hunt",
  });

  if (!board) {
    return { error: "Board not found" };
  }

  const jobs = await JobApplication.find({
    boardId: board._id,
  });

  const jobIds = jobs.map((j) => j._id);

  await JobApplication.deleteMany({
    _id: { $in: jobIds },
  });

  await Column.updateMany(
    { boardId: board._id },
    { $set: { jobApplications: [] } },
  );

  revalidatePath("/dashboard");

  return { success: true };
}
