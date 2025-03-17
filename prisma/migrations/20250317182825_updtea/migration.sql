-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "refresh_token_expires_in" INTEGER;

-- CreateIndex
CREATE INDEX "memberId" ON "Comment"("memberId");

-- CreateIndex
CREATE INDEX "issueId" ON "Comment"("issueId");

-- CreateIndex
CREATE INDEX "name" ON "Organisation"("name");

-- CreateIndex
CREATE INDEX "projectId" ON "Resource"("projectId");

-- RenameIndex
ALTER INDEX "assignedTo_project" RENAME TO "Issue_assignedToId_projectId_idx";
