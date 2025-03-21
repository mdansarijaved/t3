"use server";

import { auth } from "~/server/auth";
import { OrganisationRepository } from "~/server/repository/organisaion.repository";
import { organisationSchema } from "~/zod/schema";

export async function createOrganisation(prevState: unknown, form: FormData) {
  const orgdata = {
    name: form.get("name") as string,
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

  const slug = `${orgdata.name.split(" ").join("-")}${crypto.randomUUID()}`;

  const org = await OrganisationRepository.createOrganisation(
    orgdata.name,
    session.user.id,
    slug,
  );

  return {
    success: true,
    text: "Form Submitted",
    fieldData: org,
  };
}
