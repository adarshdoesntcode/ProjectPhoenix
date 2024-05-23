import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { download, generateCsv, mkConfig } from "export-to-csv";
import {
  ROLES_LIST,
  getEventStatusByCode,
  getEventTypeByCode,
  getProgramByCode,
} from "@/lib/config";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  filename: "Projects",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const exportExcel = (rows) => {
  const rowData = rows.map((row) => {
    return {
      Project_Code: row.original.projectCode,
      Name: row.original.projectName,
      Status: getEventStatusByCode(row.original.status),
      Type: getEventTypeByCode(row.original.projectType),
      Supervisor: "Not Assigned",
      Members: row.original.teamMembers.length,
      created_On: format(row.original.createdAt, "PPP"),
    };
  });
  const csv = generateCsv(csvConfig)(rowData);
  download(csvConfig)(csv);
};

export const DataTable = forwardRef(({ columns, data }, ref) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const naviagte = useNavigate();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  useImperativeHandle(ref, () => {
    return {
      exportCSV: () => {
        exportExcel(table.getFilteredRowModel().rows);
      },
    };
  });

  return (
    <>
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
                  // onClick={() =>
                  //   naviagte(`/${ROLES_LIST.admin}/events/${row.original._id}`)
                  // }
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
                  No Projects.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
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

DataTable.displayName = "DataTable";