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
  getEventStatusByCode,
  getEventTypeByCode,
  getProgramByCode,
} from "@/lib/config";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";

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
    header: () => <TableHead>Project Name</TableHead>,
    cell: ({ row }) => {
      const projectName = row.getValue("projectName");
      const description = row.original.projectDescription;

      return (
        <TableCell className="text-gray-600">
          <div className="font-semibold">{projectName}</div>
          {description && <div className="text-xs">{description}</div>}
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
      let variant;

      if (formatted === "Archive") {
        variant = "outline";
      } else if (formatted === "Complete") {
        variant = "secondary";
      } else {
        variant = "";
      }

      return (
        <TableCell className="hidden lg:table-cell">
          <Badge variant={variant}>{formatted}</Badge>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "projectType",
    header: () => <TableHead>Type</TableHead>,
    cell: ({ row }) => {
      const projectType = row.getValue("projectType");
      const formatted = getEventTypeByCode(projectType);
      return <TableCell className="font-semibold">{formatted}</TableCell>;
    },
  },

  {
    accessorKey: "eligibleFor",
    header: () => (
      <TableHead className="hidden lg:table-cell">Eligible For</TableHead>
    ),
    cell: ({ row }) => {
      const progressStatus = row.original.teamMembers[0].progressStatus;
      let formatted = "Nothing";

      if (
        progressStatus ===
        PROGRESS_STATUS()[row.original.projectType]
          .ELIGIBLE_FOR_PROPOSAL_DEFENSE[1]
      ) {
        formatted = "Proposal";
      } else if (
        progressStatus ===
        PROGRESS_STATUS()[row.original.projectType]
          .ELIGIBLE_FOR_FINAL_DEFENSE[1]
      ) {
        formatted = "Final";
      } else if (row.original.projectType === EVENT_TYPE.FIRST) {
        if (
          progressStatus ===
          PROGRESS_STATUS()[row.original.projectType]
            .ELIGIBLE_FOR_MID_DEFENSE[1]
        ) {
          formatted = "Mid";
        }
      }

      return (
        <TableCell className="hidden  lg:table-cell">
          <Badge variant="outline">{formatted}</Badge>
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
    header: () => (
      <TableHead className="hidden xl:table-cell">Supervisor</TableHead>
    ),
    cell: ({ row }) => {
      // const teamMembers = row.original.teamMembers;

      // const formatted = teamMembers.length;

      return (
        <TableCell className="font-semibold hidden xl:table-cell">
          Not assigned
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
  // {
  //   accessorKey: "author",
  //   header: () => (
  //     <TableHead className="hidden xl:table-cell">Created By</TableHead>
  //   ),
  //   cell: ({ row }) => {
  //     const author = row.getValue("author");
  //     const formatted = author.fullname;

  //     return (
  //       <TableCell className="text-gray-500 hidden xl:table-cell">
  //         {formatted}
  //       </TableCell>
  //     );
  //   },
  // },

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
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(project.projectCode);
                }}
              >
                Copy Project Code
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                View Project
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
