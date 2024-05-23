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
import { TableCell, TableHead } from "@/components/ui/table";
import {
  getEventStatusByCode,
  getEventTypeByCode,
  getProgramByCode,
} from "@/lib/config";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";

export const EventColumns = [
  {
    accessorKey: "eventCode",
    header: () => <TableHead>Event Code</TableHead>,
    cell: ({ row }) => {
      const eventId = row.getValue("eventCode");

      return <TableCell className="text-gray-700">{eventId}</TableCell>;
    },
  },
  {
    accessorKey: "eventName",
    header: () => <TableHead className="hidden lg:table-cell">Name</TableHead>,
    cell: ({ row }) => {
      const eventName = row.getValue("eventName");

      return (
        <TableCell className="text-gray-700 hidden lg:table-cell">
          {eventName}
        </TableCell>
      );
    },
  },
  {
    accessorKey: "eventStatus",
    header: () => <TableHead>Status</TableHead>,
    cell: ({ row }) => {
      const eventStatus = row.getValue("eventStatus");
      const formatted = getEventStatusByCode(eventStatus);

      return (
        <TableCell>
          <Badge variant="secondary">{formatted}</Badge>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "eventType",
    header: () => <TableHead>Type</TableHead>,
    cell: ({ row }) => {
      const eventType = row.getValue("eventType");
      const formatted = getEventTypeByCode(eventType);
      return (
        <TableCell className="font-semibold">
          <Badge>{formatted}</Badge>
        </TableCell>
      );
    },
  },

  {
    accessorKey: "eventTarget",
    header: () => (
      <TableHead className="hidden lg:table-cell">Target</TableHead>
    ),
    cell: ({ row }) => {
      const eventTarget = row.getValue("eventTarget");
      const formatted = getProgramByCode(eventTarget);

      return (
        <TableCell className="hidden  lg:table-cell">
          <Badge variant="outline">{formatted}</Badge>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "projects",
    header: () => (
      <TableHead className="hidden lg:table-cell">Projects</TableHead>
    ),
    cell: ({ row }) => {
      const projects = row.getValue("projects");
      const formatted = projects.length;

      return (
        <TableCell className="font-semibold hidden lg:table-cell">
          {formatted}
        </TableCell>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <TableHead className="hidden xl:table-cell">Created On</TableHead>
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");
      const formatted = format(createdAt, "PPP");

      return (
        <TableCell className="text-gray-500 hidden xl:table-cell">
          {formatted}
        </TableCell>
      );
    },
  },
  {
    accessorKey: "author",
    header: () => (
      <TableHead className="hidden xl:table-cell">Created By</TableHead>
    ),
    cell: ({ row }) => {
      const author = row.getValue("author");
      const formatted = author.fullname;

      return (
        <TableCell className="text-gray-500 hidden xl:table-cell">
          {formatted}
        </TableCell>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;

      return (
        <TableCell className="hidden md:table-cell">
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
                  navigator.clipboard.writeText(event.eventCode);
                }}
              >
                Copy Event ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                View Event
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      );
    },
  },
];
