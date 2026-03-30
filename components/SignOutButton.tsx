"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/sign-out", { method: "POST" });
      if (!res.ok) throw new Error("Logout failed.");

      await router.refresh();
      router.push("/");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <DropdownMenuItem
      onClick={handleSignOut}
      variant="destructive"
      stayOpenOnClick
      disabled={loading}
      className="flex gap-2 items-center cursor-pointer text-sm px-3
       py-2 rounded-md outline-none"
    >
      {loading ? (
        <>
          <span className="h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          <span className="ml-2">Signing out...</span>
        </>
      ) : (
        <>
          <LogOut className="h-4 w-4 text-red-600" />
          <span className="ml-2">Log out</span>
        </>
      )}
    </DropdownMenuItem>
  );
}
