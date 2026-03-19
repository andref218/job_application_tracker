"use server";

import { db } from "@/lib/auth/auth-server";

export async function validateUserSignup(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !email || !password) {
    return { error: "All fields are required" };
  }

  if (!email.includes("@")) {
    return { error: "Please enter a valid email" };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }

  const existingUser = await db.collection("user").findOne({ email });
  if (existingUser) {
    return { error: "Email already exists" };
  }

  return { firstName, lastName, email, password };
}

export async function validateUserSignin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "All fields are required" };
  }

  if (!email.includes("@")) {
    return { error: "Please enter a valid email" };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }

  return { email, password };
}
