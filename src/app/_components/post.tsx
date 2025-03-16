"use client";

import { api } from "~/trpc/react";

export function LatestPost() {
  const chat = api.user.getUsers.useQuery({
    text: "Javed",
  });
  console.log("data: ", chat.data);

  return <div className="w-full max-w-xs">Hello</div>;
}
