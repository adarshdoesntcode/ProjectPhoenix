import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { Input } from "@/components/ui/input";
import {
  ROLES_LIST,
  getEventStatusByCode,
  getEventTypeByCode,
} from "@/lib/config";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  filename: "Result",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

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
    return "NG";
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
    return "NG";
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
    return "NG";
  }
};

function aggeregate(num1, num2, num3) {
  if (
    typeof num1 !== "number" ||
    typeof num2 !== "number" ||
    typeof num3 !== "number"
  ) {
    return "NG";
  }

  const sum = Math.ceil(num1 + num2 + num3);
  return sum;
}

function getGrade(score) {
  console.log(score);
  if (typeof score !== "number" || score < 0 || score > 100) {
    return "NG";
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

const calculateAggeregate = (data) => {
  const proposal = calculateProposal(data.proposal);
  const mid = calculateMid(data.mid);
  const final = calculateFinal(data.final);
  const aggeregated = aggeregate(proposal, mid, final);

  return aggeregated;
};

const calaculateGrade = (data) => {
  const proposal = calculateProposal(data.proposal);
  const mid = calculateMid(data.mid);
  const final = calculateFinal(data.final);
  const aggeregated = aggeregate(proposal, mid, final);
  const grade = getGrade(aggeregated);

  return grade;
};

const exportExcel = (rows) => {
  const rowData = rows.map((row) => {
    const Proposal = calculateProposal(row.original.proposal);
    console.log("🚀 ~ rowData ~ Proposal:", Proposal);
    const Mid = calculateMid(row.original.mid);
    console.log("🚀 ~ rowData ~ Mid:", Mid);
    const Final = calculateFinal(row.original.final);
    console.log("🚀 ~ rowData ~ Final:", Final);
    const Aggeregate = calculateAggeregate(row.original);
    console.log("🚀 ~ rowData ~ Aggeregate:", Aggeregate);
    const Grade = calaculateGrade(row.original);
    console.log("🚀 ~ rowData ~ Grade:", Grade);
    return {
      CRN: row.original.student.rollNumber,
      Name: row.original.student.fullname,
      Proposal,
      Mid,
      Final,
      Aggeregate,
      Grade,
    };
  });
  const csv = generateCsv(csvConfig)(rowData);
  download(csvConfig)(csv);
};

export const ResultDataTable = forwardRef(({ columns, data }, ref) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "auto",
  });

  useImperativeHandle(ref, () => {
    console.log("object");
    return {
      exportCSV: () => {
        exportExcel(table.getFilteredRowModel().rows);
      },
    };
  });

  return (
    <>
      <div className="flex items-center mb-4 space-x-2">
        <Input
          placeholder="Search name, code..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="bg-white border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <React.Fragment key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </React.Fragment>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer"
                  o
                >
                  {row.getVisibleCells().map((cell) => (
                    <React.Fragment key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </React.Fragment>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-slate-500">
          Showing {table.getPaginationRowModel().rows.length} of{" "}
          {table.getCoreRowModel().rows.length}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
});

ResultDataTable.displayName = "ResultDataTable";
