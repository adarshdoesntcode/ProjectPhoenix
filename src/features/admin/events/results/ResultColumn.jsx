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

const calculateProposal = (data) => {
  if (data) {
    const fieldsToSum = [
      "performanceAtPresentation",
      "projectTitleAndAbstract",
      "project",
      "objective",
      "teamWork",
      "documentation",
    ];

    let total = 0;

    fieldsToSum.forEach((field) => {
      if (data[field] !== undefined && !isNaN(Number(data[field]))) {
        total += Number(data[field]);
      }
    });

    return Math.ceil(total * 0.3);
  } else {
    return <div className="text-xs text-slate-400">NG</div>;
  }
};

const calculateMid = (data) => {
  if (data) {
    const fieldsToSum = [
      "documentation",
      "feedbackIncorporated",
      "performanceAtPresentation",
      "workProgress",
    ];

    let total = 0;

    fieldsToSum.forEach((field) => {
      if (data[field] !== undefined && !isNaN(Number(data[field]))) {
        total += Number(data[field]);
      }
    });

    return Math.ceil(total * 5 * 0.3);
  } else {
    return <div className="text-xs text-slate-400">NG</div>;
  }
};

const calculateFinal = (data) => {
  if (data) {
    const fieldsToSum = [
      "accomplished",
      "analysisAndDesign",
      "contributionInWork",
      "creativity",
      "demo",
      "documentation",
      "objective",
      "performanceAtPresentation",
      "projectTitle",
      "toolAndTechniques",
      "volume",
    ];

    let total = 0;

    fieldsToSum.forEach((field) => {
      if (data[field] !== undefined && !isNaN(Number(data[field]))) {
        total += Number(data[field]);
      }
    });

    return Math.ceil(total * 0.4);
  } else {
    return <div className="text-xs text-slate-400">NG</div>;
  }
};

function aggeregate(num1, num2, num3) {
  if (
    typeof num1 !== "number" ||
    typeof num2 !== "number" ||
    typeof num3 !== "number"
  ) {
    return <div className="text-xs text-slate-400">NG</div>;
  }

  const sum = Math.ceil(num1 + num2 + num3);
  return sum;
}

function getGrade(score) {
  console.log(score);
  if (typeof score !== "number" || score < 0 || score > 100) {
    return <div className="text-xs text-slate-400">NG</div>;
  }

  if (score >= 90) {
    return "A";
  } else if (score >= 85) {
    return "A-";
  } else if (score >= 80) {
    return "B+";
  } else if (score >= 75) {
    return "B";
  } else if (score >= 70) {
    return "B-";
  } else if (score >= 65) {
    return "C+";
  } else if (score >= 60) {
    return "C";
  } else if (score >= 55) {
    return "C-";
  } else if (score >= 50) {
    return "D+";
  } else if (score >= 45) {
    return "D";
  } else {
    return "F";
  }
}

export const ResultColumn = [
  {
    accessorKey: "SN",
    header: () => <TableHead>SN</TableHead>,
    cell: ({ row }) => {
      return (
        <TableCell className="text-gray-700 p-2">
          {Number(row.id) + 1}
        </TableCell>
      );
    },
  },
  {
    accessorKey: "CRN",
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
      const roll = row.original.student.rollNumber;

      return (
        <TableCell className="text-gray-600 p-2">
          <div>{roll}</div>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "studentName",

    header: () => <TableHead> Name</TableHead>,
    cell: ({ row }) => {
      const name = row.original.student.fullname;

      return (
        <TableCell className="p-2">
          <div>{name}</div>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "proposal",
    header: ({ column }) => (
      <TableHead
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer text-center"
      >
        <Button variant="ghost" className="p-0 m-0 hover:bg-transparent">
          Proposal (30%)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </TableHead>
    ),
    cell: ({ row }) => {
      const proposal = calculateProposal(row.original.proposal);
      return <TableCell className="p-2 text-center">{proposal}</TableCell>;
    },
  },
  {
    accessorKey: "mid",
    header: ({ column }) => (
      <TableHead
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer text-center"
      >
        <Button variant="ghost" className="p-0 m-0 hover:bg-transparent">
          Mid Term (30%)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </TableHead>
    ),
    cell: ({ row }) => {
      const mid = calculateMid(row.original.mid);

      return <TableCell className="p-2 text-center">{mid}</TableCell>;
    },
  },
  {
    accessorKey: "final",
    header: ({ column }) => (
      <TableHead
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer text-center"
      >
        <Button variant="ghost" className="p-0 m-0 hover:bg-transparent">
          Final (40%)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </TableHead>
    ),
    cell: ({ row }) => {
      const final = calculateFinal(row.original.final);
      return <TableCell className="p-2 text-center">{final}</TableCell>;
    },
  },
  {
    accessorKey: "aggeregated",
    header: ({ column }) => (
      <TableHead
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer text-center"
      >
        <Button variant="ghost" className="p-0 m-0 hover:bg-transparent">
          Aggregated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </TableHead>
    ),
    cell: ({ row }) => {
      const proposal = calculateProposal(row.original.proposal);
      const mid = calculateMid(row.original.mid);
      const final = calculateFinal(row.original.final);
      const aggeregated = aggeregate(proposal, mid, final);
      return <TableCell className="p-2 text-center">{aggeregated}</TableCell>;
    },
  },
  {
    accessorKey: "grade",
    header: ({ column }) => (
      <TableHead
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer text-center"
      >
        <Button variant="ghost" className="p-0 m-0 hover:bg-transparent">
          Grade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </TableHead>
    ),
    cell: ({ row }) => {
      const proposal = calculateProposal(row.original.proposal);
      const mid = calculateMid(row.original.mid);
      const final = calculateFinal(row.original.final);
      const aggeregated = aggeregate(proposal, mid, final);
      const grade = getGrade(aggeregated);
      return <TableCell className="p-2 text-center">{grade}</TableCell>;
    },
  },

  // {
  //   accessorKey: "defenseTime",
  //   header: () => <TableHead className="hidden lg:table-cell">Time</TableHead>,
  //   cell: ({ row }) => {
  //     const defenseTime = format(row.original.defenseTime, "hh:mm a");

  //     return (
  //       <TableCell className="hidden  lg:table-cell">
  //         <Badge variant="outline">{defenseTime}</Badge>
  //       </TableCell>
  //     );
  //   },
  // },
];
