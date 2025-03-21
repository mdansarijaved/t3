import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ProjectRepository } from "~/server/repository/project.repository";

export const projectRouter = createTRPCRouter({
  getProjectsByOrganisationSlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      const id = ctx.session?.user.id;
      if (!id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      const projects = await ProjectRepository.getProjectsByOrganisationSlug(
        input.slug,
      );
      return projects;
    }),
});
