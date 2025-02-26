"use server";

import { z } from "zod";
import { db } from "~/server/db";

const componentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  jsonData: z.string().min(1, "Component data is required"),
});

type ActionResponse = {
  success: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  error?: string;
};

export async function createComponent(
  formData: FormData,
): Promise<ActionResponse> {
  try {
    // Validate the form data
    const validatedFields = componentSchema.safeParse({
      name: formData.get("name"),
      jsonData: formData.get("jsonData"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Invalid form data: " + validatedFields.error.message,
      };
    }

    const comp = validatedFields.data.jsonData;

    // Create the component in the database
    const component = await db.compoenent.create({
      data: {
        name: validatedFields.data.name,
        component: comp,
      },
    });

    return {
      success: true,
      data: component,
    };
  } catch (error) {
    console.error("Component creation error:", error);
    return {
      success: false,
      error: "Failed to create component",
    };
  }
}

// Optional: Add action to fetch components
export async function getComponents() {
  try {
    const components = await db.compoenent.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: components };
  } catch (error) {
    return { success: false, error: "Failed to fetch components" };
  }
}
