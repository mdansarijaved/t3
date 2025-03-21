"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

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
        },
        {
          title: "Starred",
        },
        {
          title: "Settings",
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
        },
        {
          title: "Explorer",
        },
        {
          title: "Quantum",
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
        },
        {
          title: "Get Started",
        },
        {
          title: "Tutorials",
        },
        {
          title: "Changelog",
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
        },
        {
          title: "Team",
        },
        {
          title: "Billing",
        },
        {
          title: "Limits",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const params = useParams();
  console.log("params", params);
  const { slug } = params;
  const { data: activeOrganisation, isLoading } =
    api.organisation.getOrgansationByslug.useQuery({
      slug: slug as string,
    });
  return (
    <Sidebar collapsible="icon" {...props}>
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
