"use client";

import { Board, Column, JobApplication } from "@/lib/models/models.types";
import {
  Award,
  Calendar,
  CheckCircle2,
  Mic,
  MoreHorizontal,
  MoreVertical,
  Trash2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import CreateJobApplicationDialog from "./CreateJobDialog";
import JobApplicationCard from "./JobApplicationCard";
import { useBoard } from "@/lib/hooks/useBoard";

type KanbanBoardProps = {
  board: Board;
  userId: string;
};

interface ColConfig {
  color: string;
  icon: React.ReactNode;
}
const COLUMN_CONFIG: Array<ColConfig> = [
  {
    color: "bg-cyan-500",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className="h-4 w-4" />,
  },
];

function DropableColumn({
  column,
  config,
  boardId,
  sortedColumns,
}: {
  column: Column;
  config: ColConfig;
  boardId: string;
  sortedColumns: Column[];
}) {
  const sortedJobs =
    column.jobApplications?.sort((a, b) => a.order - b.order) || [];
  return (
    <Card className="w-full md:min-w-[260px] md:max-w-[400px] md:flex-shrink-0 shadow-md p-0">
      <CardHeader
        className={`${config.color} text-white rounded-t-lg pb-3 pt-3`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle className="text-sm font-semibold">
              {column.name}
            </CardTitle>
          </div>
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
              className="w-40 p-1 rounded-lg shadow-md border bg-popover text-popover-foreground"
            >
              <DropdownMenuItem
                className="flex items-center gap-2 px-2 py-2 text-sm cursor-pointer 
              rounded-md text-red-500 hover:bg-red-50 outline-none"
              >
                <Trash2 className="h-4 w-4" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pt-4 bg-gray-50/50 min-h-[400px] rounded-b-lg">
        <div className="space-y-3">
          {sortedJobs.map((job, key) => (
            <SortableJobCard
              key={key}
              job={{ ...job, columnId: job.columnId || column._id }}
              columns={sortedColumns}
            />
          ))}
        </div>
        <div className="mb-5 mt-3">
          <CreateJobApplicationDialog columnId={column._id} boardId={boardId} />
        </div>
      </CardContent>
    </Card>
  );
}

function SortableJobCard({
  job,
  columns,
}: {
  job: JobApplication;
  columns: Column[];
}) {
  return (
    <div>
      <JobApplicationCard job={job} columns={columns} />
    </div>
  );
}

export default function KanbanBoard({ board, userId }: KanbanBoardProps) {
  const { columns, moveJob } = useBoard(board);

  const sortedColumns = columns?.sort((a, b) => a.order - b.order) || [];
  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 md:overflow-x-auto pb-4 px-1">
          {columns.map((col, key) => {
            const config = COLUMN_CONFIG[key] || {
              color: "bg-cyan-500",
              icon: <Calendar className="h-4 w-4" />,
            };
            return (
              <DropableColumn
                key={key}
                column={col}
                config={config}
                boardId={board._id}
                sortedColumns={sortedColumns}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
