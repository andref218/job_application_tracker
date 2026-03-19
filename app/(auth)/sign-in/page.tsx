"use client";

import { loginUser } from "@/actions/auth";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useActionState } from "react";

const initialState = { error: "" };

const SignIn = () => {
  const [state, formAction] = useActionState(loginUser, initialState);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader className="pb-3 text-center">
          <CardTitle className="text-3xl font-bold text-left mb-1">
            Sign In
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1 text-left">
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>

        <form action={formAction} className="space-y-6">
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
                minLength={8}
                required
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-1  focus:border-primary transition"
              />
            </div>
            {state.error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {state.error}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col items-center gap-3">
            <SubmitButton label="Sign In" pendingLabel="Signing in..." />

            <p className="text-sm text-gray-500 hover:text-gray-700 transition">
              Don't have an account ?
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
