"use client";
import type { Priority, Status } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import type { Data } from "~/app/dashboard/[slug]/page";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const column: ColumnDef<Data>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <Link href={`#`} className="text-sm underline">
          {row.getValue("title")}
        </Link>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority: Priority = row.getValue("priority");
      return (
        <span className="text-xs capitalize">{priority.toLowerCase()}</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      console.log("column", column);
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="text-xs capitalize">Status</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(column.id === "OPEN")}
              >
                Open
              </DropdownMenuItem>
              <DropdownMenuItem>Backlog</DropdownMenuItem>
              <DropdownMenuItem>Blocked</DropdownMenuItem>
              <DropdownMenuItem>Cancelled</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
              <DropdownMenuItem>In Progress</DropdownMenuItem>
              <DropdownMenuItem>Planned</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
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

      return <span className={color + " text-xs capitalize"}>{status}</span>;
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => {
      const data: {
        user: {
          name: string;
          image: string;
        };
      } = row.getValue("assignedTo");
      if (!data.user) return <span className="text-xs">Unassigned</span>;
      return (
        <div className="flex items-center gap-2 text-xs">
          <Avatar>
            <AvatarImage
              src={data.user.image}
              alt={data.user.name}
              className="h-6 w-6"
            />
            <AvatarFallback>{data.user.name[0]}</AvatarFallback>
          </Avatar>
          <span>{data.user.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 w-8"
            onClick={() => row.toggleSelected(!!row.getIsSelected())}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8"
            onClick={() => row.toggleSelected(!!row.getIsSelected())}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
