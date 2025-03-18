import { TRPCError } from "@trpc/server";
import { signOut } from "next-auth/react";
import { set, z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { UserRepository } from "~/server/repository/user";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure.input(z.object({})).query(async ({ input, ctx }) => {
    const id = ctx.session?.user.id;
    if (!id) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User not found",
      });
    }
    const user = await UserRepository.getUserById(id);

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
    return user;
  }),
});
