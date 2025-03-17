import { set, z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUsers: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input, ctx }) => {
      //   await new Promise((resolve) => setTimeout(resolve, 1000));
      //   const users = await ctx.db.user.findMany();
      //   return { input, users };
      return input;
    }),
});
