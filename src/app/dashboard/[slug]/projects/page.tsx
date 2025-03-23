import { ListFilter, SquareChartGantt, Star } from "lucide-react";
import React from "react";
import NewProjectButton from "~/components/dashboard/new-project";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/server";

async function Projects({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = await api.project.getProjectsByOrganisationSlug({
    slug,
  });
  console.log("projects", projects);

  return (
    <div className="flex w-full flex-col justify-center gap-4">
      <div className="flex items-center justify-between border-y py-2">
        <h1 className="text-2xl font-medium">Projects</h1>
        <div className="flex items-center gap-4">
          <Button
            variant={"outline"}
            className="flex items-center rounded px-2 py-1"
          >
            filter
            <ListFilter />
          </Button>
          <NewProjectButton />

          <Separator orientation="vertical" className="h-7" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SquareChartGantt /> {project.name}
              </CardTitle>
              <CardDescription>
                {project.createdAt.toDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
            </CardContent>
            <CardFooter>
              <p>{project.starred ? <Star fill="gold" /> : <Star />}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* <ProjectSidebar /> */}
    </div>
  );
}

export default Projects;
