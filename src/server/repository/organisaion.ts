import { PrismaClient } from "@prisma/client";
import { db } from "../db";

export class OrganisationRepository {
  static async getOrgansiationByUserID(id: string) {
    return await db.organisation.findMany({
      where: {
        ownerId: id,
      },
    });
  }
  static async getOrganisation(slug: string) {
    return await db.organisation.findUnique({
      where: {
        slug,
      },
    });
  }
}
