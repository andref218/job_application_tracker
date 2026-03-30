"use client";

import { signIn } from "@/lib/auth/auth-client";
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
import { Button } from "@/components/ui/button";
import { validateUserSignin } from "@/actions/auth";

const SignIn = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setError("");
    setSuccess("");
    setLoading(true);

    // Server side validation in the actions/auth.ts
    const validation = await validateUserSignin(formData);
    if ("error" in validation) {
      setError(validation.error || "Unknown error");
      setLoading(false);
      return;
    }

    const { email, password } = validation;

    try {
      // Client-side login: sets the auth cookie
      const result = await signIn.email({ email, password });

      // Better Auth might return an object with error in data
      if (result?.error) {
        setError(
          result.error?.message ||
            result.error?.statusText ||
            "Failed to sign in",
        );
        setLoading(false);
        return;
      }

      setSuccess("Logged in successfully!");

      // Redirect only if login succeeds
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
        setError("Failed to sign in.");
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
            Sign In
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1 text-left">
            Enter your credentials to access your account.
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
                required
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-1 focus:border-primary transition"
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
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-sm text-gray-500 hover:text-gray-700 transition">
              Don't have an account?
              <Link
                href="/sign-up"
                className="font-medium text-primary hover:underline pl-1"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
