import { Column, JobApplication } from "@/lib/models/models.types";
import { Card, CardContent } from "./ui/card";
import { Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";

interface JobApplicationcardProps {
  job: JobApplication;
  columns: Column[];
}

const JobApplicationCard = ({ job, columns }: JobApplicationcardProps) => {
  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1">{job.position}</h3>
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
                          >
                            <span className="truncate">
                              Move to{" "}
                              <span className="font-medium">{column.name}</span>
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
    </>
  );
};

export default JobApplicationCard;
