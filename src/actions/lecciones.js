"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function guardarLeccion(formData) {
  const id = formData.get("id"); // Si existe, editamos. Si no, creamos.
  const cursoId = parseInt(formData.get("cursoId"));
  const titulo = formData.get("titulo");
  const videoUrl = formData.get("videoUrl"); // El ID de Bunny
  const duracion = formData.get("duracion");
  const contenido = formData.get("contenido");
  const esFree = formData.get("esFree") === "on";
  const orden = parseInt(formData.get("orden") || "1");

  if (id) {
    // ACTUALIZAR
    await prisma.leccion.update({
      where: { id: parseInt(id) },
      data: { titulo, videoUrl, duracion, contenido, esFree, orden },
    });
  } else {
    // CREAR NUEVA
    await prisma.leccion.create({
      data: {
        titulo,
        videoUrl,
        duracion,
        contenido,
        esFree,
        orden,
        cursoId,
      },
    });
  }

  revalidatePath(`/admin/cursos/${cursoId}/lecciones`);
}

export async function eliminarLeccion(id, cursoId) {
  await prisma.leccion.delete({ where: { id: parseInt(id) } });
  revalidatePath(`/admin/cursos/${cursoId}/lecciones`);
}