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
import { getEvaluatorTypeByCode } from "@/lib/config";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";

export const EvaluatorColumn = [
  {
    accessorKey: "sn",
    header: () => <TableHead className="">SN</TableHead>,
    cell: ({ row }) => {
      return (
        <TableCell className="text-gray-950 ">{Number(row.id) + 1}</TableCell>
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
      const designation = row.original.designation;
      const email = row.original.email;
      const contact = row.original.contact;

      return (
        <TableCell className="text-gray-950">
          <div className="font-semibold">{fullname}</div>
          <div className=" text-sm text-slate-500 lg:hidden block">{email}</div>
          <div className="text-xs text-slate-500 lg:hidden block">
            {contact}
          </div>
          <div className="text-xs text-slate-500 hidden lg:block">
            {designation}
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
      const contact = row.original.contact;

      return (
        <TableCell className="text-gray-500 hidden lg:block">
          <div className="text-xs">{email}</div>
          <div className="text-xs">{contact}</div>
        </TableCell>
      );
    },
  },

  // {
  //   accessorKey: "isAssociated",
  //   header: () => (
  //     <TableHead className="hidden lg:table-cell">Association</TableHead>
  //   ),
  //   cell: ({ row }) => {
  //     const isAssociated = row.getValue("isAssociated");

  //     return (
  //       <TableCell className="hidden lg:table-cell">
  //         <Badge variant="outline">
  //           {isAssociated ? "Associated" : "Not Associated"}
  //         </Badge>
  //       </TableCell>
  //     );
  //   },
  // },

  {
    accessorKey: "evaluatorType",
    header: () => <TableHead className="hidden lg:table-cell">Type </TableHead>,
    cell: ({ row }) => {
      let formatted = row.getValue("evaluatorType");
      return (
        <TableCell className="hidden  lg:table-cell">
          <Badge variant={formatted === "99" ? "outline" : "secondary"}>
            {getEvaluatorTypeByCode(formatted)}
          </Badge>
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
