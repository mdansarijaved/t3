import React from "react";
import { HydrateClient } from "~/trpc/server";
import HeroSection from "~/components/hero-section";

async function Home() {
  // void api.user.getUsers.prefetch({ text: "javed" });
  // const session = await auth();
  return (
    <HydrateClient>
      <HeroSection />
    </HydrateClient>
  );
}

export default Home;
