"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function actualizarPost(formData) {
  const id = parseInt(formData.get("id"));
  const titulo = formData.get("titulo");
  const contenido = formData.get("contenido");
  const imagenUrl = formData.get("imagenUrl");
  const slug = formData.get("slug");
  const resumen = formData.get("resumen");
  const publicado = formData.get("publicado") === "on";

  await prisma.post.update({
    where: { id },
    data: {
      titulo,
      contenido,
      imagenUrl,
      slug,
      resumen,
      publicado,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/blog");
}

export async function crearPost(formData) {
  const titulo = formData.get("titulo");
  const contenido = formData.get("contenido");
  const imagenUrl = formData.get("imagenUrl");
  const slug = formData.get("slug");
  const resumen = formData.get("resumen");
  const publicado = formData.get("publicado") === "on";

  await prisma.post.create({
    data: {
      titulo,
      contenido,
      imagenUrl,
      slug,
      resumen,
      publicado,
    },
  });

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function eliminarPost(id) {
  try {
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    // Revalidamos la ruta para que el post desaparezca de la lista inmediatamente
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar el post:", error);
    return { success: false, error: "No se pudo eliminar el artículo." };
  }
}