"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function agregarRecurso(formData) {
  const nombre = formData.get("nombre");
  const url = formData.get("url");
  const leccionId = parseInt(formData.get("leccionId"));
  const cursoId = formData.get("cursoId");

  await prisma.recurso.create({
    data: { nombre, url, leccionId }
  });

  revalidatePath(`/admin/cursos/${cursoId}/lecciones`);
}

export async function eliminarRecurso(id, cursoId) {
  await prisma.recurso.delete({ where: { id } });
  revalidatePath(`/admin/cursos/${cursoId}/lecciones`);
}