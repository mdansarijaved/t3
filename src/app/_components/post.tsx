"use client";

import { api } from "~/trpc/react";

export function LatestPost() {
  const [data] = api.user.getUsers.useSuspenseQuery({
    text: "Javed",
  });
  console.log("data: ", data);

  return <div className="w-full max-w-xs">{JSON.stringify(data)}</div>;
}
