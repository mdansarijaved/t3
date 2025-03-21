import { PrismaClient, Priority, Role, Status } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userId = "cm8del7w60000r6caou604ats";
  // Delete in reverse order of dependencies
  await prisma.comment.deleteMany();
  await prisma.issue.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.member.deleteMany();
  await prisma.project.deleteMany();
  await prisma.organisation.deleteMany();

  //   Create organizations
  const orgs = await Promise.all([
    prisma.organisation.create({
      data: {
        name: "Acme Corp",
        slug: "acme-corp",
        ownerId: userId,
        starred: true,
      },
    }),
    prisma.organisation.create({
      data: {
        name: "Tech Innovators",
        slug: "tech-innovators",
        ownerId: userId,
        starred: false,
      },
    }),
    prisma.organisation.create({
      data: {
        name: "Design Studio",
        slug: "design-studio",
        ownerId: userId,
        starred: true,
      },
    }),
  ]);

  // Create members for each organization
  const members = await Promise.all(
    orgs.map((org) =>
      prisma.member.create({
        data: {
          userId: userId,
          organisationId: org.id,
          role: Role.ADMIN,
        },
      }),
    ),
  );

  // Project names and descriptions
  const projectData = [
    {
      name: "Website Redesign",
      description: "Complete overhaul of company website",
      starred: true,
    },
    {
      name: "Mobile App",
      description: "New mobile application development",
      starred: false,
    },
    {
      name: "E-commerce Platform",
      description: "Building a scalable e-commerce solution",
      starred: true,
    },
    {
      name: "CRM System",
      description: "Customer relationship management system",
      starred: false,
    },
    {
      name: "Analytics Dashboard",
      description: "Real-time analytics and reporting dashboard",
      starred: true,
    },
    {
      name: "Content Management",
      description: "Content management system for digital assets",
      starred: false,
    },
    {
      name: "API Gateway",
      description: "Centralized API gateway service",
      starred: true,
    },
    {
      name: "Authentication Service",
      description: "OAuth2 and SSO implementation",
      starred: false,
    },
    {
      name: "Payment Integration",
      description: "Payment processing system integration",
      starred: true,
    },
    {
      name: "Search Engine",
      description: "Advanced search and filtering system",
      starred: false,
    },
  ];

  // Create projects for each organization
  const projects = await Promise.all(
    orgs.flatMap((org) =>
      projectData.map((project) =>
        prisma.project.create({
          data: {
            name: project.name,
            description: project.description,
            organisationId: org.id,
            projectslug: `${org.slug}-${project.name.toLowerCase().replace(/ /g, "-")}`,
            starred: project.starred,
            teamMembers: {
              connect: {
                id: members.find((m) => m.organisationId === org.id)?.id,
              },
            },
          },
        }),
      ),
    ),
  );

  // Resource data
  const resourceData = [
    {
      title: "Design System",
      description: "Figma design system documentation",
    },
    { title: "API Documentation", description: "REST API documentation" },
    {
      title: "User Research",
      description: "User research findings and insights",
    },
    {
      title: "Technical Specs",
      description: "Technical specifications document",
    },
    { title: "Style Guide", description: "Brand and design style guide" },
    { title: "Architecture", description: "System architecture documentation" },
    { title: "Test Cases", description: "QA test cases and scenarios" },
    {
      title: "Security Guide",
      description: "Security guidelines and protocols",
    },
    { title: "Deployment Guide", description: "Deployment and hosting guide" },
    { title: "User Manual", description: "End-user documentation" },
  ];

  // Create resources for each project
  await Promise.all(
    projects.flatMap((project) =>
      resourceData.map((resource) =>
        prisma.resource.create({
          data: {
            title: resource.title,
            description: resource.description,
            link: `https://docs.example.com/${project.projectslug}/${resource.title.toLowerCase().replace(/ /g, "-")}`,
            projectId: project.id,
          },
        }),
      ),
    ),
  );

  // Issue data
  const issueData = [
    {
      title: "Homepage Layout",
      description: "Implement new homepage layout based on design",
      priority: Priority.HIGH,
      status: Status.INPROGRESS,
    },
    {
      title: "User Authentication",
      description: "Implement OAuth2 authentication flow",
      priority: Priority.CRITICAL,
      status: Status.PLANNED,
    },
    {
      title: "Database Optimization",
      description: "Optimize database queries for better performance",
      priority: Priority.MEDIUM,
      status: Status.OPEN,
    },
    {
      title: "Mobile Responsiveness",
      description: "Fix mobile responsive issues",
      priority: Priority.HIGH,
      status: Status.BACKLOG,
    },
    {
      title: "API Integration",
      description: "Integrate third-party API services",
      priority: Priority.MEDIUM,
      status: Status.COMPLETED,
    },
    {
      title: "Security Audit",
      description: "Perform security vulnerability assessment",
      priority: Priority.CRITICAL,
      status: Status.INPROGRESS,
    },
    {
      title: "Performance Testing",
      description: "Conduct load and performance testing",
      priority: Priority.HIGH,
      status: Status.BLOCKED,
    },
    {
      title: "Documentation Update",
      description: "Update API documentation",
      priority: Priority.LOW,
      status: Status.OPEN,
    },
    {
      title: "Bug Fixes",
      description: "Fix reported bugs in production",
      priority: Priority.HIGH,
      status: Status.INPROGRESS,
    },
    {
      title: "Feature Implementation",
      description: "Implement new feature requests",
      priority: Priority.MEDIUM,
      status: Status.PLANNED,
    },
  ];

  // Create issues for each project
  const issues = await Promise.all(
    projects.flatMap((project) =>
      issueData.map((issue) =>
        prisma.issue.create({
          data: {
            title: issue.title,
            description: issue.description,
            priority: issue.priority,
            status: issue.status,
            projectId: project.id,
            assignedToId: members.find(
              (m) => m.organisationId === project.organisationId,
            )?.id,
          },
        }),
      ),
    ),
  );

  // Comment data
  const commentData = [
    "Initial analysis completed",
    "Working on implementation",
    "Need more clarification",
    "Fixed in latest commit",
    "Waiting for review",
    "Testing in progress",
    "Dependencies updated",
    "Ready for deployment",
    "Found a potential solution",
    "Added new test cases",
  ];

  // Create comments for each issue
  await Promise.all(
    issues.flatMap((issue) =>
      commentData.map((comment) =>
        prisma.comment.create({
          data: {
            comment,
            memberId: members.find(
              (m) =>
                m.organisationId ===
                projects.find((p) => p.id === issue.projectId)?.organisationId,
            )!.id,
            issueId: issue.id,
          },
        }),
      ),
    ),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
