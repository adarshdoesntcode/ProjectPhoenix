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
  getEvaluatorTypeByCode,
  getEventStatusByCode,
  getEventTypeByCode,
} from "@/lib/config";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  filename: "Supervisors",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const exportExcel = (rows) => {
  const rowData = rows.map((row) => {
    return {
      SN: Number(row.id) + 1,
      Name: row.original.fullname,
      Email: row.original.email,
      Phone: row.original.phoneNumber,
      Designation: row.original.designation,
      Institution: row.original.institution,
      Skill_Set: row.original.skillSet.join(", "),
      Available: row.original.isAvailable,
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
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState();
  const navigate = useNavigate();

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
          placeholder="Search name, email..."
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

DataTable.displayName = "DataTable";