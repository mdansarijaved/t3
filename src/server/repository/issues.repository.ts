import { db } from "~/server/db";

export class IssueRepository {
  static async getIssuesByProjectId(projectId: string) {
    return await db.issue.findMany({
      where: {
        projectId: projectId,
      },
    });
  }
  static async getIssuesByOrganisation(slug: string) {
    console.time("getIssuesByOrganisation");
    const issues = await db.issue.findMany({
      where: {
        project: {
          organisation: {
            slug,
          },
        },
      },
      select: {
        title: true,
        status: true,
        assignedTo: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        priority: true,
      },
    });
    console.timeEnd("getIssuesByOrganisation");
    return issues;
  }
}
