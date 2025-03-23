"use client";

import * as React from "react";
import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";

import { NavMain } from "~/components/nav-main";
import { NavProjects } from "~/components/nav-projects";
import { NavUser } from "~/components/nav-user";
import { TeamSwitcher } from "~/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import { link } from "fs";

const data = {
  navMain: [
    {
      title: "Workspace",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Projects",
          link: "/projects",
        },
        {
          title: "Starred",
          link: "/starred",
        },
        {
          title: "Settings",
          link: "/settings",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          link: "/models/genesis",
        },
        {
          title: "Explorer",
          link: "/models/explorer",
        },
        {
          title: "Quantum",
          link: "/models/quantum",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          link: "/docs/introduction",
        },
        {
          title: "Get Started",
          link: "/docs/get-started",
        },
        {
          title: "Tutorials",
          link: "/docs/tutorials",
        },
        {
          title: "Changelog",
          link: "/docs/changelog",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          link: "/settings/general",
        },
        {
          title: "Team",
          link: "/settings/team",
        },
        {
          title: "Billing",
          link: "/settings/billing",
        },
        {
          title: "Limits",
          link: "/settings/limits",
        },
      ],
    },
  ],
};

export function ProjectSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const params = useParams();
  const { slug } = params;
  const { data: activeOrganisation } =
    api.organisation.getOrgansationByslug.useQuery({
      slug: slug as string,
    });
  return (
    <Sidebar side="right" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} slug={slug as string} />
        <NavProjects projects={activeOrganisation?.Project ?? []} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
