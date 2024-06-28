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
import { getEventStatusByCode, getEventTypeByCode } from "@/lib/config";
import { format } from "date-fns";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";

export const ProjectColumn = [
  {
    accessorKey: "projectCode",
    header: () => <TableHead>Project Code</TableHead>,
    cell: ({ row }) => {
      const projectCode = row.getValue("projectCode");

      return <TableCell className="text-gray-700">{projectCode}</TableCell>;
    },
  },
  {
    accessorKey: "projectName",
    header: ({ column }) => (
      <TableHead
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer"
      >
        <Button variant="ghost" className="p-0 m-0 hover:bg-transparent">
          Project Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </TableHead>
    ),
    cell: ({ row }) => {
      const projectName = row.getValue("projectName");
      const description = row.original.projectDescription;

      return (
        <TableCell className="text-gray-600 max-w-64">
          <div className="font-semibold line-clamp-1">{projectName}</div>
          {description && (
            <div className="text-xs line-clamp-2">{description}</div>
          )}
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
    accessorKey: "projectType",
    header: () => <TableHead className="hidden md:table-cell">Type</TableHead>,
    cell: ({ row }) => {
      const projectType = row.getValue("projectType");
      const formatted = getEventTypeByCode(projectType);
      return (
        <TableCell className="hidden md:table-cell">
          <Badge>{formatted}</Badge>
        </TableCell>
      );
    },
  },

  {
    accessorKey: "members",
    header: () => (
      <TableHead className="hidden xl:table-cell">Members</TableHead>
    ),
    cell: ({ row }) => {
      const teamMembers = row.original.teamMembers;

      const formatted = teamMembers.length;

      return (
        <TableCell className="font-semibold hidden xl:table-cell">
          {formatted}
        </TableCell>
      );
    },
  },
  {
    accessorKey: "supervisor",
    header: ({ column }) => {
      return (
        <TableHead
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" hidden xl:table-cell"
        >
          <Button variant="ghost" className="p-0 m-0 hover:bg-transparent">
            Supervisor
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </TableHead>
      );
    },
    cell: ({ row }) => {
      const shouldHide = row.original.projectType < 1;

      if (row.original.supervisor?.supervisorId?.fullname) {
        return (
          <TableCell className="hidden  xl:table-cell font-semibold">
            {row.original.supervisor?.supervisorId?.fullname}
          </TableCell>
        );
      } else {
        return (
          <TableCell className="hidden  xl:table-cell text-slate-400">
            {shouldHide ? "-" : "Not Assigned"}
          </TableCell>
        );
      }
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <TableHead
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer hidden xl:table-cell"
      >
        <Button variant="ghost" className="p-0 m-0 hover:bg-transparent">
          Created On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </TableHead>
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

  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const project = row.original;

  //     return (
  //       <TableCell className="hidden md:table-cell">
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <DropdownMenuItem
  //               onClick={(e) => {
  //                 e.stopPropagation();
  //                 navigator.clipboard.writeText(project.projectCode);
  //               }}
  //             >
  //               Copy Project Code
  //             </DropdownMenuItem>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem>
  //               <Link
  //                 onClick={(e) => {
  //                   e.stopPropagation();
  //                 }}
  //                 to={`${row.original._id}`}
  //               >
  //                 View Project
  //               </Link>
  //             </DropdownMenuItem>
  //             <DropdownMenuItem
  //               onClick={(e) => {
  //                 e.stopPropagation();
  //               }}
  //             >
  //               Archive
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </TableCell>
  //     );
  //   },
  // },
];
