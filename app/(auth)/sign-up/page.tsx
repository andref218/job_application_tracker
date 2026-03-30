"use client";

import { signUp } from "@/lib/auth/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth/auth-server";
import { validateUserSignup } from "@/actions/auth";
import { Button } from "@/components/ui/button";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setError("");
    setSuccess("");
    setLoading(true);

    // Server side validation in the actions/auth.ts
    const validation = await validateUserSignup(formData);
    if ("error" in validation) {
      const errors = validation.error;
      const firstError = Object.values(errors)[0]?.[0] || "Unknown error";
      setError(firstError);
      setLoading(false);
      return;
    }

    const { firstName, lastName, email, password } = validation;
    const name = `${firstName} ${lastName}`;

    try {
      // Create user client-side to ensure the authentication cookie is set in the browser
      await signUp.email({ name, email, password });

      setSuccess("Account created successfully!");

      // Redirect only if sign up succeeds
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      // Catch all possible error formats from Better Auth
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Failed to sign up.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader className="pb-4 text-center">
          <CardTitle className="text-3xl font-bold text-left mb-1">
            Sign Up
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1 text-left">
            Create an account to start tracking your job applications.
          </CardDescription>
        </CardHeader>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            await handleSubmit(formData);
          }}
          className="space-y-6"
        >
          <CardContent className="space-y-4">
            {/* Name fields */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex flex-col">
                <label
                  htmlFor="firstName"
                  className="mb-1 text-sm font-bold text-gray-700"
                >
                  First Name
                </label>
                <input
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  required
                  className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label
                  htmlFor="lastName"
                  className="mb-1 text-sm font-bold text-gray-700"
                >
                  Last Name
                </label>
                <input
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  required
                  className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-1 text-sm font-bold text-gray-700"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="mb-1 text-sm font-bold text-gray-700"
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="Enter your password"
                minLength={8}
                required
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-1  focus:border-primary transition"
              />
            </div>
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-md bg-green-100 p-3 text-sm text-green-700">
                {success}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col items-center gap-3">
            <Button
              type="submit"
              disabled={loading || Boolean(success)}
              className="w-full bg-primary text-white hover:bg-primary/90 transition cursor-pointer"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            <p className="text-sm text-gray-500 hover:text-gray-700 transition">
              Already have an account?
              <Link
                href="/sign-in"
                className="font-medium text-primary hover:underline pl-1"
              >
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
