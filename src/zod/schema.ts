import { z } from "zod";

export const organisationSchema = z.object({
  name: z.string().min(1, "Name is required."),
});
