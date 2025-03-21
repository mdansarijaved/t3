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
                image: true,
              },
            },
          },
        },
        priority: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.timeEnd("getIssuesByOrganisation");
    return issues;
  }

  static async getIssuesCount(slug: string) {
    return await db.issue.count({
      where: {
        project: {
          organisation: {
            slug,
          },
        },
      },
    });
  }
}
