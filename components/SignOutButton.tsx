"use client";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch("/api/auth/sign-out", { method: "POST" });
    router.refresh();
    setTimeout(() => {
      router.push("/");
    }, 50);
  };

  return (
    <DropdownMenuItem
      onClick={handleSignOut}
      className="cursor-pointer text-sm px-3 py-2 rounded-md hover:bg-gray-100 focus:bg-gray-200 outline-none"
    >
      Log out
    </DropdownMenuItem>
  );
}
