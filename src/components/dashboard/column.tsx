"use client";
import type { Priority, Status } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, Edit, Ellipsis, ListFilter, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Data } from "~/app/dashboard/[slug]/page";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/components/ui/select";

import PriorityFilter from "./priorityFilter";
import { Separator } from "~/components/ui/separator";

export const column: ColumnDef<Data>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center justify-between">
          <div>Title</div>
          <Separator orientation="vertical" className="h-7" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <Link href={`#`} className="text-sm underline">
          {row.getValue("title")}
        </Link>
      );
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return <PriorityFilter />;
    },
    cell: ({ row }) => {
      const priority: Priority = row.getValue("priority");
      return <div className="text-xs capitalize">{priority.toLowerCase()}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      console.log("column", column);
      return (
        <div className="flex items-center justify-between">
          <div>Status</div>
          <div>
            <Select>
              <SelectTrigger className="justify-start gap-4 rounded-none border-none focus:outline-none focus-visible:ring-0">
                <div className="flex items-center justify-between gap-1">
                  <ListFilter />
                  <Separator orientation="vertical" className="h-7" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem
                  value="BACKLOG"
                  onClick={() => column.getIsSorted()}
                >
                  BACKLOG
                </SelectItem>
                <SelectItem value="OPEN">OPEN</SelectItem>
                <SelectItem value="BLOCKED">BLOCKED</SelectItem>
                <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                <SelectItem value="INPROGRESS">INPROGRESS</SelectItem>
                <SelectItem value="PLANNED">PLANNED</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <div>Assigned To</div>
          <Separator orientation="vertical" className="h-7" />
        </div>
      );
    },
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
          <Ellipsis strokeWidth={2} />
        </div>
      );
    },
  },
];
