"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "@base-ui/react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState, useTransition } from "react";
import { createJobApplication } from "@/actions/job-applications";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
}
const INITIAL_FORM_DATA = {
  company: "",
  position: "",
  location: "",
  notes: "",
  salary: "",
  jobUrl: "",
  tags: "",
  description: "",
};

export default function CreateJobApplicationDialog({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      try {
        const result = await createJobApplication({
          ...formData,
          columnId,
          boardId,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0),
        });

        router.refresh();

        if (!result.error) {
          toast.success("Job added successfully!");
          setFormData(INITIAL_FORM_DATA);
          setOpen(false);
        } else {
          toast.error("Failed to create job");
          console.error("Failed to create job", result.error);
        }
      } catch (error) {
        toast.error("Failed to create job");
        console.log(error);
      }
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" className="cursor-pointer">
          <Plus />
          Add Job
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 sm:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Add Job Application</DialogTitle>
          <DialogDescription>Track a new job application</DialogDescription>
        </DialogHeader>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label
                htmlFor="company"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Company <span className="text-red-500">*</span>
              </Label>
              <Input
                id="company"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="position"
                className="text-sm font-medium text-gray-700  mb-2"
              >
                Position <span className="text-red-500">*</span>
              </Label>
              <Input
                id="position"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
                transition"
                placeholder="Job Title"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label
                htmlFor="location"
                className="text-sm font-medium text-gray-700 mb-2 "
              >
                Location
              </Label>
              <Input
                id="location"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                placeholder="City, Country"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="salary"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Salary
              </Label>
              <Input
                id="salary"
                placeholder="e.g., $100k - $150k"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
                transition"
                value={formData.salary}
                onChange={(e) =>
                  setFormData({ ...formData, salary: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="jobUrl"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Job URL
            </Label>
            <Input
              id="jobUrl"
              type="url"
              placeholder="https://..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
              transition"
              value={formData.jobUrl}
              onChange={(e) =>
                setFormData({ ...formData, jobUrl: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="tags"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Tags (comma-separated)
            </Label>
            <Input
              id="tags"
              placeholder="React, Tailwind, High Pay"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
              transition"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </Label>
            <Textarea
              id="description"
              rows={3}
              placeholder="Brief description of the role..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
              transition"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="notes"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Notes
            </Label>
            <Textarea
              id="notes"
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            transition"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="cursor-pointer flex items-center justify-center gap-2"
              disabled={isPending}
            >
              {isPending && (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isPending ? "Adding application..." : "Add Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
