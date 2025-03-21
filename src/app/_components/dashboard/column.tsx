"use client";
import type { Status } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import type { Data } from "~/app/dashboard/[slug]/page";

export const column: ColumnDef<Data>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: Status = row.getValue("status");
      const colors = (status: Status) => {
        switch (status) {
          case "OPEN":
            return "text-green-700 bg-green-200 px-2 py-1 ";
          case "BACKLOG":
            return "text-yellow-700 bg-yellow-200 px-2 py-1 ";
          case "BLOCKED":
            return "text-red-700 bg-red-200 px-2 py-1 ";
          case "CANCELLED":
            return "text-red-700 bg-red-200 px-2 py-1 ";
          case "COMPLETED":
            return "text-green-700 bg-green-200 px-2 py-1 ";
          case "INPROGRESS":
            return "text-blue-700 bg-blue-300 px-2 py-1 ";
          case "PLANNED":
            return "text-blue-700 bg-blue-200 px-2 py-1 ";
        }
      };
      const color = colors(status);

      return <span className={color}>{status}</span>;
    },
  },
  {
    accessorKey: "assignedTo.user.name",
    header: "Assigned To",
  },
];
