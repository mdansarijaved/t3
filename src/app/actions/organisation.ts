"use server";

import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { organisationSchema } from "~/zod/schema";

export async function createOrganisation(prevState: unknown, form: FormData) {
  const orgdata = {
    name: form.get("name") as string,
    description: form.get("description") as string,
  };

  const session = await auth();

  const validatedFields = organisationSchema.safeParse(orgdata);

  if (validatedFields.error) {
    return {
      success: false,
      text: "Please fill all the data",
      error: validatedFields.error.flatten().fieldErrors,
      fieldData: orgdata,
    };
  }

  return {
    success: true,
    text: "Form Submitted",
    fieldData: orgdata,
  };
}
