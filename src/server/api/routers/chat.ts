import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const chatRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  createChat: publicProcedure
    .input(
      z.object({
        title: z.string(),
        messages: z.object({
          sender: z.enum([
            "CoreSystemMessage",
            "CoreUserMessage",
            "CoreAssistantMessage",
            "CoreToolMessage",
          ]),
          message: z.string(),
        }),
      }),
    )
    .mutation(({ input, ctx }) => {
      console.log("message recieved is ", input);
      return;
    }),
});
