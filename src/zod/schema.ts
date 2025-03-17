import { z } from "zod";

export const organisationSchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().min(4, "Minimun 4 chars are required."),
});


