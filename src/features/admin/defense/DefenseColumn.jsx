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
  EVENT_TYPE,
  PROGRESS_STATUS,
  ROLES_LIST,
  getEventStatusByCode,
  getEventTypeByCode,
} from "@/lib/config";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";

export const DefenseColumn = [
  {
    accessorKey: "serialNumber",
    header: () => <TableHead>SN</TableHead>,
    cell: ({ row }) => {
      return (
        <TableCell className="text-gray-700">{Number(row.id) + 1}</TableCell>
      );
    },
  },
  {
    accessorKey: "eventCode",
    header: ({ column }) => {
      return (
        <TableHead
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          <Button variant="ghost" className="p-0 m-0 hover:bg-transparent">
            For Event
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </TableHead>
      );
    },
    cell: ({ row }) => {
      const eventCode = row.original.event.eventCode;

      return <TableCell className="text-gray-700"> {eventCode}</TableCell>;
    },
  },
  {
    accessorKey: "defenseType",
    header: ({ column }) => (
      <TableHead
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer"
      >
        <Button variant="ghost" className="p-0 m-0 hover:bg-transparent">
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </TableHead>
    ),
    cell: ({ row }) => {
      const defenseType = row.original.defenseType;

      return (
        <TableCell className="text-gray-600">
          <Badge>{defenseType.toUpperCase()}</Badge>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "status",

    header: () => (
      <TableHead className="hidden lg:table-cell"> Status</TableHead>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      const formatted = getEventStatusByCode(status);

      return (
        <TableCell className="hidden lg:table-cell">
          <Badge variant="secondary">{formatted}</Badge>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "defenseDate",
    header: ({ column }) => (
      <TableHead
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer hidden sm:table-cell"
      >
        <Button variant="ghost" className="p-0 m-0 hover:bg-transparent">
          Defense Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </TableHead>
    ),
    cell: ({ row }) => {
      const defenseDate = format(row.original.defenseDate, "PPP");
      return (
        <TableCell className="hidden md:table-cell">
          <div>{defenseDate}</div>
        </TableCell>
      );
    },
  },

  {
    accessorKey: "defenseTime",
    header: () => <TableHead className="hidden lg:table-cell">Time</TableHead>,
    cell: ({ row }) => {
      const defenseTime = format(row.original.defenseTime, "hh:mm a");

      return (
        <TableCell className="hidden  lg:table-cell">
          <Badge variant="outline">{defenseTime}</Badge>
        </TableCell>
      );
    },
  },

  {
    id: "actions",
    header: () => <TableHead className="hidden md:table-cell"> </TableHead>,

    cell: ({ row }) => {
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

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Link to={`/${ROLES_LIST.admin}/defense/${row.original._id}`}>
                  View Defense
                </Link>
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
