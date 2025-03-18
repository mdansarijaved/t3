"use server";

import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { organisationSchema } from "~/zod/schema";

export async function createOrganisation(prevState: unknown, form: FormData) {
  const orgdata = {
    name: form.get("name") as string,
    description: form.get("description") as string,
  };

  const session = await auth();

  if (!session) {
    return;
  }
  const validatedFields = organisationSchema.safeParse(orgdata);

  if (validatedFields.error) {
    return {
      success: false,
      text: "Please fill all the data",
      error: validatedFields.error.flatten().fieldErrors,
      fieldData: orgdata,
    };
  }

  const slug = `${orgdata.name}${crypto.randomUUID()}`;

  const org = await db.organisation.create({
    data: {
      name: orgdata.name,
      slug,
      ownerId: session?.user.id,
    },
  });

  redirect(`/dashboard/${org.slug}`);

  return {
    success: true,
    text: "Form Submitted",
    fieldData: orgdata,
  };
}
