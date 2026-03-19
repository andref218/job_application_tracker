"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useSession, signOut } from "@/lib/auth/auth-client";

const AuthButtons = () => {
  const { data: session, isPending } = useSession();

  if (session?.user) {
    return <div></div>;
  }

  return (
    <>
      <Link href="/sign-in">
        <Button
          variant="ghost"
          className="text-gray-700 hover:text-black cursor-pointer"
        >
          Login
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
          Start for free
        </Button>
      </Link>
    </>
  );
};

export default AuthButtons;
