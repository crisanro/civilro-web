-- DropForeignKey
ALTER TABLE "Recurso" DROP CONSTRAINT "Recurso_leccionId_fkey";

-- AlterTable
ALTER TABLE "Recurso" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "peso" TEXT,
ADD COLUMN     "postId" INTEGER,
ADD COLUMN     "tipo" TEXT,
ALTER COLUMN "leccionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Recurso" ADD CONSTRAINT "Recurso_leccionId_fkey" FOREIGN KEY ("leccionId") REFERENCES "Leccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recurso" ADD CONSTRAINT "Recurso_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
