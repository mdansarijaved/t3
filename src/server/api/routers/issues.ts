import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { IssueRepository } from "~/server/repository/issues.repository";

export const issueRouter = createTRPCRouter({
  getIssuesByOrganisation: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const id = ctx.session?.user.id;
      if (!id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      const issues = await IssueRepository.getIssuesByOrganisation(input.slug);
      if (!issues?.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No issues found",
        });
      }
      return issues;
    }),
});
