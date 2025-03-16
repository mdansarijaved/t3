import React from "react";

import { LatestPost } from "./_components/post";

async function Home() {
  // const response = await api.post.justChecking({ messages: ["hello"] });
  // = await api.post.hello({ text: "Hello" });

  return (
    <div className="">
      <LatestPost />
    </div>
  );
}

export default Home;
