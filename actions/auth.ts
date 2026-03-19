"use server";

import { auth } from "@/lib/auth/auth-server";
import { redirect } from "next/navigation";

export async function registerUser(
  prevState: { error: string },
  formData: FormData,
) {
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

  const name = `${firstName} ${lastName}`;
  try {
    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
  } catch (err: any) {
    if (err.response?.data?.error) {
      return { error: err.response.data.error };
    }
    return { error: err.message || "Failed to sign up." };
  }
  redirect("/dashboard");
}

export async function loginUser(
  prevState: { error: string },
  formData: FormData,
) {
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

  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (err: any) {
    if (err.response?.data?.error) {
      return { error: err.response.data.error };
    }
    return { error: err.message || "Failed to sign in." };
  }
  redirect("/dashboard");
}
