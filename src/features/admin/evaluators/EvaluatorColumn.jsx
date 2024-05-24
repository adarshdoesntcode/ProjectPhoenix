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
  getEvaluatorTypeByCode,
  getEventStatusByCode,
  getEventTypeByCode,
} from "@/lib/config";
import { format } from "date-fns";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";

export const EvaluatorColumn = [
  {
    accessorKey: "sn",
    header: ({ column }) => (
      <TableHead className="hidden md:table-cell">SN</TableHead>
    ),
    cell: ({ row }) => {
      return (
        <TableCell className="text-gray-950 hidden md:table-cell">
          {Number(row.id) + 1}
        </TableCell>
      );
    },
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => (
      <TableHead
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer"
      >
        <Button variant="ghost" className="p-0 m-0 hover:bg-transparent">
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </TableHead>
    ),
    cell: ({ row }) => {
      const fullname = row.getValue("fullname");
      const designation = row.original.designation;

      return (
        <TableCell className="text-gray-950">
          <div>{fullname}</div>
          <div className="text-xs text-slate-500">{designation}</div>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => <TableHead>Contact</TableHead>,
    cell: ({ row }) => {
      const email = row.original.email;
      const contact = row.original.contact;

      return (
        <TableCell className="text-gray-500">
          <div>{email}</div>
          <div>{contact}</div>
        </TableCell>
      );
    },
  },

  {
    accessorKey: "isAssociated",
    header: () => (
      <TableHead className="hidden lg:table-cell">Association</TableHead>
    ),
    cell: ({ row }) => {
      const isAssociated = row.getValue("isAssociated");

      return (
        <TableCell className="hidden lg:table-cell">
          <Badge variant="outline">
            {isAssociated ? "Associated" : "Not Associated"}
          </Badge>
        </TableCell>
      );
    },
  },

  {
    accessorKey: "evaluatorType",
    header: () => <TableHead className="hidden lg:table-cell">Type </TableHead>,
    cell: ({ row }) => {
      let formatted = row.getValue("evaluatorType");
      return (
        <TableCell className="hidden  lg:table-cell">
          <Badge>{getEvaluatorTypeByCode(formatted)}</Badge>
        </TableCell>
      );
    },
  },

  {
    accessorKey: "institution",
    header: () => (
      <TableHead className="hidden lg:table-cell">Institution </TableHead>
    ),
    cell: ({ row }) => {
      let institution = row.getValue("institution");
      return (
        <TableCell className="hidden lg:table-cell">
          {institution ?? "-"}
        </TableCell>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;

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
                <Link to={`${row.original._id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      );
    },
  },
];
