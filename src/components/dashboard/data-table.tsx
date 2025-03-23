"use client";

import type { ColumnDef } from "@tanstack/react-table";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { Button } from "~/components/ui/button";
import { PaginationEllipsis } from "~/components/ui/pagination";
import { Separator } from "~/components/ui/separator";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TasksTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
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
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex w-full items-center justify-between border-t px-4 py-1 text-center">
        <span className="flex items-center justify-center text-sm text-muted-foreground">
          {table.getCoreRowModel().rows.length} rows
        </span>
        <div>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              size="sm"
            >
              Previous
            </Button>
            <Button variant="link" size="sm">
              {table.getState().pagination.pageIndex + 1}
            </Button>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              size="sm"
            >
              {table.getState().pagination.pageIndex + 2}
            </Button>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              size="sm"
            >
              {table.getState().pagination.pageIndex + 3}
            </Button>
            <PaginationEllipsis />
            <Button
              variant="outline"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
