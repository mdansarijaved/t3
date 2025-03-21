import React from "react";
import { TasksTable } from "~/app/_components/dashboard/data-table";
import { column } from "~/app/_components/dashboard/column";
import { api } from "~/trpc/server";

const fetcher = async (slug: string) => {
  const data = await api.issue.getIssuesByOrganisation({ slug });
  return data;
};
export type Data = Awaited<ReturnType<typeof fetcher>>[number];
async function OrgDashboard({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetcher(slug);
  return (
    <div className="px-5">
      <h1 className="text-2xl font-bold"> Tasks</h1>
      <div className="">
        <TasksTable columns={column} data={data} />
      </div>
    </div>
  );
}

export default OrgDashboard;
