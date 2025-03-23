import { db } from "~/server/db";

export class ProjectRepository {
  static async getProjectsByOrganisationSlug(slug: string) {
    return await db.project.findMany({
      where: {
        organisation: {
          slug: slug,
        },
      },
      orderBy: {
        starred: "desc",
      },
    });
  }
}
