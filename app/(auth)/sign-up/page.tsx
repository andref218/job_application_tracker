"use client";

import { registerUser } from "@/actions/auth";
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

//import { useState } from "react";
import { useFormStatus } from "react-dom";

const initialState = { error: "" };

const SignUp = () => {
  const [state, formAction] = useActionState(registerUser, initialState);

  //const [firstName, setFirstName] = useState("");
  //const [lastName, setLastName] = useState("");
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");

  //const [error, setError] = useState("");
  //const [loading, setLoading] = useState(false);

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

        <form action={formAction} className="space-y-6">
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
                  //value={firstName}
                  //onChange={(e) => setFirstName(e.target.value)}
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
                  //value={lastName}
                  //onChange={(e) => setLastName(e.target.value)}
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
                //value={email}
                //onChange={(e) => setEmail(e.target.value)}
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
                //value={password}
                //onChange={(e) => setPassword(e.target.value)}
                //minLength={8}
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
            <SubmitButton label="Sign Up" pendingLabel="Signing up..." />
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
