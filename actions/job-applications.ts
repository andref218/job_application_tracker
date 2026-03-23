"use server";

import { getSession } from "@/lib/auth/auth-server";
import connectDB from "@/lib/db";
import { JobApplication, Column, Board } from "@/lib/models";
import { revalidatePath } from "next/cache";

interface JobApplicationData {
  company: string;
  position: string;
  location?: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  columnId: string;
  boardId: string;
  tags?: string[];
  description?: string;
}

export async function createJobApplication(data: JobApplicationData) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  try {
    await connectDB();

    const {
      company,
      position,
      location,
      notes,
      salary,
      jobUrl,
      columnId,
      boardId,
      tags,
      description,
    } = data;

    if (!company || !position || !columnId || !boardId) {
      throw new Error("Company, Position, Column ID and Board ID are required");
    }

    //Verify board ownership
    const board = await Board.findOne({
      _id: boardId,
      userId: session.user.id,
    });

    if (!board) {
      return { error: "Board not found" };
    }

    //Verify column belongs to board
    const column = await Column.findOne({
      _id: columnId,
      boardId: boardId,
    });

    if (!column) {
      return { error: "Column not found" };
    }

    const maxOrder = (await JobApplication.findOne({ columnId })
      .sort({ order: -1 })
      .select("order")
      .lean()) as { order: number } | null;

    // Create job in MongoDB
    const jobApplication = await JobApplication.create({
      company,
      position,
      location,
      salary,
      jobUrl,
      tags: tags || [],
      description,
      notes,
      columnId,
      boardId,
      userId: session.user.id,
      status: "applied",
      order: maxOrder ? maxOrder.order + 1 : 0,
    });

    //Updates column with jobApplication ID
    await Column.findByIdAndUpdate(columnId, {
      $push: { jobApplications: jobApplication._id },
    });

    return { data: JSON.parse(JSON.stringify(jobApplication)) };
  } catch (err) {
    console.error("Error creating job application:", err);
    throw err;
  }
}
