"use client";

import { clearBoardJobs } from "@/actions/board";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface ClearBoardButtonProps {
  board: {
    name: string;
    columns: {
      jobApplications: any[];
    }[];
  };
}

export default function ClearBoardButton({ board }: ClearBoardButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //hasJobs returns a boolean
  const hasJobs = board.columns.some((col) => col.jobApplications.length > 0);

  const handleClear = () => {
    if (!hasJobs) {
      toast.warning("No jobs to clear");
      return;
    }

    startTransition(async () => {
      await clearBoardJobs();
      toast.success("Board cleared");
      setIsDialogOpen(false);
    });
  };

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        disabled={isPending || !hasJobs}
        className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg 
      hover:bg-red-50 transition flex items-center gap-2 cursor-pointer disabled:opacity-50 
      disabled:cursor-not-allowed"
      >
        {hasJobs ? "Clear board" : "No jobs to clear"}
      </button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-sm w-full p-6">
          <DialogHeader>
            <DialogTitle className="text-xl">Confirm Clear Board</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete all job applications? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isPending}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleClear}
              disabled={isPending}
              className="cursor-pointer"
            >
              {isPending && (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isPending ? "Clearing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
