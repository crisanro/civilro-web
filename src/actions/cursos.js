"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 1. CREAR CURSO
export async function crearCurso(formData) {
  const titulo = formData.get("titulo");
  const slug = formData.get("slug");
  const descripcion = formData.get("descripcion");
  const resumen = formData.get("resumen"); // <--- NUEVO
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
      resumen, // <--- GUARDADO
      nivel,
      accesoMinimo,
      categoriaId,
      publicado,
      imagenUrl,
    },
  });

  revalidatePath("/admin/cursos");
  revalidatePath("/cursos"); // Revalidamos la lista pública de cursos
  redirect("/admin/cursos");
}

// 2. ACTUALIZAR CURSO
export async function actualizarCurso(formData) {
  const id = parseInt(formData.get("id"));
  const titulo = formData.get("titulo");
  const slug = formData.get("slug");
  const descripcion = formData.get("descripcion");
  const resumen = formData.get("resumen"); // <--- NUEVO
  const nivel = formData.get("nivel");     // <--- NUEVO (Faltaba en tu anterior)
  const imagenUrl = formData.get("imagenUrl");
  const categoriaId = parseInt(formData.get("categoriaId"));
  const accesoMinimo = formData.get("accesoMinimo");
  const publicado = formData.get("publicado") === "on"; // <--- NUEVO

  await prisma.curso.update({
    where: { id },
    data: {
      titulo,
      slug,
      descripcion,
      resumen,   // <--- ACTUALIZADO
      nivel,     // <--- ACTUALIZADO
      imagenUrl,
      categoriaId,
      accesoMinimo,
      publicado, // <--- ACTUALIZADO
    },
  });

  revalidatePath("/admin/cursos");
  revalidatePath(`/cursos/${slug}`);
  revalidatePath("/cursos");
  redirect("/admin/cursos");
}

// 3. ELIMINAR CURSO
export async function eliminarCurso(id) {
  const cursoId = parseInt(id);

  // 1. Limpiamos lecciones (y recursos de lecciones si fuera necesario)
  // Nota: Si tienes recursos amarrados a lecciones, borra primero recursos
  await prisma.recurso.deleteMany({
    where: { leccion: { cursoId: cursoId } }
  });

  await prisma.leccion.deleteMany({
    where: { cursoId: cursoId }
  });

  // 2. Finalmente borramos el curso
  await prisma.curso.delete({
    where: { id: cursoId },
  });

  revalidatePath("/admin/cursos");
  revalidatePath("/cursos");
}