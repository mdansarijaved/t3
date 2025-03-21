import { TRPCError } from "@trpc/server";
import { notFound } from "next/navigation";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { OrganisationRepository } from "~/server/repository/organisaion.repository";

export const orgRouter = createTRPCRouter({
  getOrganisations: protectedProcedure
    .input(z.object({}))
    .query(async ({ ctx }) => {
      try {
        const id = ctx.session.user.id;
        if (!id) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User not found",
          });
        }

        const teams = await OrganisationRepository.getOrgansiationByUserID(id);
        if (!teams?.length) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No organisations found",
          });
        }
        return teams;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch organisations",
        });
      }
    }),
  getOrgansationByslug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const id = ctx.session.user.id;
      if (!id) {
        notFound();
      }
      const organisation = await OrganisationRepository.getOrganisationBySlug(
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
