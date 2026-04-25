-- AlterTable
ALTER TABLE "Comentario" ADD COLUMN     "parentId" INTEGER;

-- AlterTable
ALTER TABLE "ComentarioLeccion" ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "ComentarioLeccion" ADD CONSTRAINT "ComentarioLeccion_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ComentarioLeccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comentario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
