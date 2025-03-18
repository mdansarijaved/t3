import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { OrganisationRepository } from "~/server/repository/organisaion";

export const orgRouter = createTRPCRouter({
  getOrganisations: protectedProcedure
    .input(z.object({}))
    .query(async ({ ctx, input }) => {
      const id = ctx.session.user.id;
      const teams = await OrganisationRepository.getOrgansiationByUserID(id);
      if (!teams) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No organisations found",
        });
      }
      return teams;
    }),
  getOrgansation: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const organisation = await OrganisationRepository.getOrganisation(
        input.slug,
      );
      if (!organisation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Organisation not found",
        });
      }
      return organisation;
    }),
});
