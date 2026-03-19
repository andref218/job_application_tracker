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
    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
      Log out
    </DropdownMenuItem>
  );
}
