import { redirect } from "next/navigation";

import { auth } from "~/server/auth";

import { api } from "~/trpc/server";

async function Dashboard() {
  const session = await auth();
  if (!session) {
    return;
  }

  const orgs = await api.organisation.getOrganisations({});
  if (!orgs?.length || !orgs[0]) {
    redirect("/join");
  }
  redirect(`/dashboard/${orgs[0].slug}`);
}

export default Dashboard;
