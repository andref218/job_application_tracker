"use client";

import { Column, JobApplication } from "@/lib/models/models.types";
import { Card, CardContent } from "./ui/card";
import { Edit2, ExternalLink, MoreVertical, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import {
  deleteJobApplication,
  updateJobApplication,
} from "@/actions/job-applications";
import { Input } from "@base-ui/react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

interface JobApplicationcardProps {
  job: JobApplication;
  columns: Column[];
}

const JobApplicationCard = ({ job, columns }: JobApplicationcardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, startDeleting] = useTransition();
  const [isUpdating, startUpdating] = useTransition();

  const [formData, setFormData] = useState({
    company: job.company,
    position: job.position,
    location: job.location || "",
    notes: job.notes || "",
    salary: job.salary || "",
    jobUrl: job.jobUrl || "",
    columnId: job.columnId || "",
    tags: job.tags?.join(", ") || "",
    description: job.description || "",
  });

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    startUpdating(async () => {
      try {
        const result = await updateJobApplication(job._id, {
          ...formData,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0),
        });

        if (!result.error) {
          toast.success("Job updated successfully!");
          setIsEditing(false);
        } else {
          toast.error(result.error || "Failed to update job.");
        }
      } catch (error) {
        console.error("Failed to update job", error);
        toast.error("Failed to update job");
      }
    });
  }

  async function handleDelete() {
    startDeleting(async () => {
      try {
        const result = await deleteJobApplication(job._id);
        if (!result.error) {
          toast.success("Job deleted successfully.");
          setIsDialogOpen(false);
        } else {
          toast.error("Failed to delete job");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete job");
      }
    });
  }

  async function handleMove(newColumnId: string) {
    try {
      const column = columns.find((c) => c._id === newColumnId);
      const result = await updateJobApplication(job._id, {
        columnId: newColumnId,
      });

      if (!result.error) {
        toast.success(`Job moved to "${column?.name || "New Column"}" column`);
      } else {
        toast.error(result.error || "Failed to move job");
      }
    } catch (error) {
      console.error("Failed to move job application", error);
      toast.error("Failed to move job");
    }
  }
  return (
    <>
      <AnimatePresence>
        <motion.div
          layout
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{
            duration: 0.2,
            ease: [0.68, -0.55, 0.27, 1.55],
          }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1 truncate">
                    {job.position}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {job.company}
                  </p>
                  {job.description && (
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {job.description}
                    </p>
                  )}
                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {job.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 
                      dark:text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {job.jobUrl && (
                    <a
                      href={job.jobUrl}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <div className="flex items-start gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-md"
                      >
                        <MoreVertical className="h-4 w-4 text-gray-600" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-44 p-1 rounded-lg shadow-md border bg-popover"
                    >
                      {/* Edit */}
                      <DropdownMenuItem
                        className="flex items-center gap-2 px-2 py-2 text-sm cursor-pointer 
                  rounded-md hover:bg-gray-200 outline-none"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit2 className="h-4 w-4 text-gray-500" />
                        Edit
                      </DropdownMenuItem>

                      {/* Move */}
                      {columns.length > 1 && (
                        <>
                          <div className="my-1 h-px bg-gray-200" />

                          {columns
                            .filter((c) => c._id !== job.columnId)
                            .map((column) => (
                              <DropdownMenuItem
                                key={column._id}
                                className="flex items-center px-2 py-2 text-sm cursor-pointer rounded-md 
                            hover:bg-gray-200 outline-none"
                                onClick={() => handleMove(column._id)}
                              >
                                <span className="truncate">
                                  Move to{" "}
                                  <span className="font-medium">
                                    {column.name}
                                  </span>
                                </span>
                              </DropdownMenuItem>
                            ))}
                        </>
                      )}

                      {/* Divider */}
                      <div className="my-1 h-px bg-gray-200" />

                      {/* Delete */}
                      <DropdownMenuItem
                        className="flex items-center gap-2 px-2 py-2 text-sm cursor-pointer 
                  rounded-md text-red-500 hover:bg-red-50 outline-none"
                        onClick={() => setIsDialogOpen(true)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="p-6 sm:max-w-2xl w-full  max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Job Application</DialogTitle>
            <DialogDescription>Track a new job application</DialogDescription>
          </DialogHeader>
          <form className="space-y-6" onSubmit={handleUpdate}>
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
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
                transition"
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
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary 
                focus:border-primary transition"
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
                onClick={() => setIsEditing(false)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="flex items-center gap-2 cursor-pointer"
              >
                {isUpdating && (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isUpdating ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-sm w-full p-6">
          <DialogHeader>
            <DialogTitle className="text-xl">Confirm Delete Job</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job application? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isDeleting}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2 cursor-pointer"
            >
              {isDeleting && (
                <span
                  className="h-4 w-4 border-2 border-white border-t-transparent rounded-full 
                animate-spin"
                />
              )}
              {isDeleting ? "Deleting..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobApplicationCard;
