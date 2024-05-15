// import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getEventStatusByCode,
  getEventTypeByCode,
  getProgramByCode,
} from "@/lib/config";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";

export const EventColumns = [
  {
    accessorKey: "eventId",
    header: "Event ID",
    cell: ({ row }) => {
      const eventId = row.getValue("eventId");

      return <div className="text-gray-500">{eventId}</div>;
    },
  },
  {
    accessorKey: "eventName",
    header: "Name",
  },
  {
    accessorKey: "eventStatus",
    header: "Status",
    cell: ({ row }) => {
      const eventStatus = row.getValue("eventStatus");
      const formatted = getEventStatusByCode(eventStatus);
      let variant;

      if (formatted === "Archive") {
        variant = "destructive";
      } else if (formatted === "Complete") {
        variant = "secondary";
      } else {
        variant = "";
      }

      return <Badge variant={variant}>{formatted}</Badge>;
    },
  },
  {
    accessorKey: "eventType",
    header: "Type",
    cell: ({ row }) => {
      const eventType = row.getValue("eventType");
      const formatted = getEventTypeByCode(eventType);
      return <div className="font-semibold">{formatted}</div>;
    },
  },

  {
    accessorKey: "eventTarget",
    header: "Target",
    cell: ({ row }) => {
      const eventTarget = row.getValue("eventTarget");
      const formatted = getProgramByCode(eventTarget);

      return <Badge variant="outline">{formatted}</Badge>;
    },
  },
  {
    accessorKey: "projects",
    header: "Projects",
    cell: ({ row }) => {
      const projects = row.getValue("projects");
      const formatted = projects.length;

      return <div className="font-semibold">{formatted}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created On",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");
      const formatted = format(createdAt, "PPP");

      return <div className="text-gray-500">{formatted}</div>;
    },
  },
  {
    accessorKey: "author",
    header: "Created By",
    cell: ({ row }) => {
      const author = row.getValue("author");
      const formatted = author.fullname;

      return <div className="text-gray-500">{formatted}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(event.eventId);
              }}
            >
              Copy Event ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Event</DropdownMenuItem>
            <DropdownMenuItem>Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
