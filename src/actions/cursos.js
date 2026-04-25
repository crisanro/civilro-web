"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 1. CREAR CURSO
export async function crearCurso(formData) {
  const titulo = formData.get("titulo");
  const slug = formData.get("slug");
  const descripcion = formData.get("descripcion");
  const resumen = formData.get("resumen");
  const nivel = formData.get("nivel");
  const accesoMinimo = formData.get("accesoMinimo");
  const categoriaId = parseInt(formData.get("categoriaId"));
  const publicado = formData.get("publicado") === "on";
  const imagenUrl = formData.get("imagenUrl"); 

  await prisma.curso.create({
    data: {
      titulo,
      slug,
      descripcion,
      resumen,
      nivel,
      accesoMinimo,
      categoriaId,
      publicado,
      imagenUrl,
    },
  });

  revalidatePath("/admin/cursos");
  revalidatePath("/cursos");
  redirect("/admin/cursos");
}

// 2. ACTUALIZAR CURSO
export async function actualizarCurso(formData) {
  const id = parseInt(formData.get("id"));
  const titulo = formData.get("titulo");
  const slug = formData.get("slug");
  const descripcion = formData.get("descripcion");
  const resumen = formData.get("resumen");
  const nivel = formData.get("nivel");
  const imagenUrl = formData.get("imagenUrl");
  const categoriaId = parseInt(formData.get("categoriaId"));
  const accesoMinimo = formData.get("accesoMinimo");
  const publicado = formData.get("publicado") === "on";

  await prisma.curso.update({
    where: { id },
    data: {
      titulo,
      slug,
      descripcion,
      resumen,
      nivel,
      imagenUrl,
      categoriaId,
      accesoMinimo,
      publicado,
    },
  });

  revalidatePath("/admin/cursos");
  revalidatePath(`/cursos/${slug}`);
  revalidatePath("/cursos");
  redirect("/admin/cursos");
}

// 3. ELIMINAR CURSO (Con manejo de errores)
export async function eliminarCurso(id) {
  try {
    const cursoId = parseInt(id);

    // 1. Borrado en cascada manual (Prisma)
    await prisma.recurso.deleteMany({
      where: { leccion: { cursoId: cursoId } }
    });

    await prisma.leccion.deleteMany({
      where: { cursoId: cursoId }
    });

    // 2. Borrar el curso
    await prisma.curso.delete({
      where: { id: cursoId },
    });

    revalidatePath("/admin/cursos");
    revalidatePath("/cursos");
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar curso:", error);
    return { success: false, error: "Error de integridad al eliminar." };
  }
}