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