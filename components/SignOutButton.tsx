"use client";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch("/api/auth/sign-out", { method: "POST" });

    await router.refresh();

    router.push("/");
  };

  return (
    <DropdownMenuItem
      onClick={handleSignOut}
      className="flex gap-2 items-center cursor-pointer text-sm px-3 py-2 rounded-md 
      hover:bg-gray-100 focus:bg-gray-200 outline-none"
    >
      <LogOut className="h-4 w-4" />
      Log out
    </DropdownMenuItem>
  );
}
