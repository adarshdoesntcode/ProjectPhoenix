import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { TableCell, TableHead } from "@/components/ui/table";

import { ArrowUpDown } from "lucide-react";

export const SupervisorColumn = [
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
      const contact = row.original.phoneNumber;

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
      const contact = row.original.phoneNumber;

      return (
        <TableCell className="text-gray-500 text-xs hidden lg:block">
          <div>{email}</div>
          <div>{contact}</div>
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
    accessorKey: "institution",
    header: () => (
      <TableHead className="hidden lg:table-cell">Institution </TableHead>
    ),
    cell: ({ row }) => {
      let institution = row.getValue("institution");
      return (
        <TableCell className="hidden font-medium lg:table-cell">
          {institution ?? "-"}
        </TableCell>
      );
    },
  },

  {
    accessorKey: "skillSet",
    header: () => (
      <TableHead className="hidden lg:table-cell">Skill Set </TableHead>
    ),
    cell: ({ row }) => {
      let skills = row.getValue("skillSet");

      console.log(skills);
      return (
        <TableCell className="hidden    lg:table-cell">
          {skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="mr-1 mb-1">
              {skill}
            </Badge>
          ))}
        </TableCell>
      );
    },
  },
];
