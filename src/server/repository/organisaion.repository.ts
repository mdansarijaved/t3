import { db } from "../db";

const organisationSelect = {
  id: true,
  name: true,
  slug: true,
};

export class OrganisationRepository {
  static async getOrgansiationByUserID(id: string) {
    return await db.organisation.findMany({
      where: {
        ownerId: id,
      },
      select: organisationSelect,
    });
  }
  static async getOrganisationBySlug(slug: string) {
    return await db.organisation.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        ownerId: true,
        Project: true,
        members: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  static async createOrganisation(name: string, ownerId: string, slug: string) {
    return await db.organisation.create({
      data: {
        name,
        slug,
        ownerId,
      },
    });
  }
}
