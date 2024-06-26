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
import { getEvaluatorTypeByCode, getProgramByCode } from "@/lib/config";
import { MoreHorizontal, ArrowUpDown, CloudFog } from "lucide-react";
import { Link } from "react-router-dom";

export const StudentColumn = [
  {
    accessorKey: "roll",
    header: ({ column }) => (
      <TableHead
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer"
      >
        <Button variant="ghost" className="p-0 m-0 hover:bg-transparent">
          CRN
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </TableHead>
    ),
    cell: ({ row }) => {
      return (
        <TableCell className="text-gray-950 ">
          {row.original.rollNumber}
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
      const fullname = row.original.fullname;
      const email = row.original.email;
      const contact = row.original.phoneNumber;

      return (
        <TableCell className="text-gray-950">
          <div className="font-semibold">{fullname}</div>
          <div className=" text-xs text-slate-500 ">{email}</div>
          <div className="text-xs text-slate-500 lg:hidden block">
            {contact}
          </div>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "contact",
    header: () => (
      <TableHead className="hidden lg:table-cell">Contact</TableHead>
    ),
    cell: ({ row }) => {
      const email = row.original.email;
      const contact = row.original.phoneNumber;

      return (
        <TableCell className="text-gray-500 hidden lg:block ">
          <div className="text-xs">{contact}</div>
        </TableCell>
      );
    },
  },

  {
    accessorKey: "isAssociated",
    header: () => (
      <TableHead className="hidden lg:table-cell">Associated</TableHead>
    ),
    cell: ({ row }) => {
      const isAssociated = row.getValue("isAssociated");

      return (
        <TableCell className="hidden lg:table-cell">
          <Badge variant={isAssociated ? "" : "secondary"}>
            {isAssociated ? "Yes" : "No"}
          </Badge>
        </TableCell>
      );
    },
  },

  {
    accessorKey: "program",
    header: ({ column }) => (
      <TableHead
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer hidden  lg:table-cell"
      >
        <Button variant="ghost" className="p-0 m-0 hover:bg-transparent">
          Program
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </TableHead>
    ),
    cell: ({ row }) => {
      let program = getProgramByCode(row.original.program);

      return (
        <TableCell className="hidden lg:table-cell">
          <Badge variant="outline"> {program}</Badge>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "batch",
    header: ({ column }) => (
      <TableHead
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer hidden  lg:table-cell"
      >
        <Button variant="ghost" className="p-0 m-0 hover:bg-transparent">
          Batch
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </TableHead>
    ),
    cell: ({ row }) => {
      let formatted = row.original.batchNumber;
      return (
        <TableCell className="hidden  lg:table-cell">{formatted}</TableCell>
      );
    },
  },
];
