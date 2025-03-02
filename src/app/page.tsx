import React from "react";
import { api } from "~/trpc/server";

async function Home() {
  // const response = await api.post.justChecking({ messages: ["hello"] });
  // = await api.post.hello({ text: "Hello" });

  return <div className="">{}</div>;
}

export default Home;
