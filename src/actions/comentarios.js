"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * Crea un comentario nuevo o una respuesta (hilo)
 */
export async function gestionarComentario(formData) {
  // 1. Extraer y convertir datos
  const texto = formData.get("texto");
  const rawUserId = formData.get("userId");
  const rawParentId = formData.get("parentId");
  const rawLeccionId = formData.get("leccionId");
  const rawPostId = formData.get("postId");

  // Conversión segura a Int
  const userId = rawUserId ? parseInt(rawUserId) : null;
  const parentId = rawParentId ? parseInt(rawParentId) : null;
  const leccionId = rawLeccionId ? parseInt(rawLeccionId) : null;
  const postId = rawPostId ? parseInt(rawPostId) : null;

  // 2. Validación básica
  if (!texto || !userId) {
    throw new Error("Faltan datos obligatorios (texto o usuario)");
  }

  try {
    if (leccionId) {
      await prisma.comentarioLeccion.create({
        data: { 
          texto, 
          userId, 
          leccionId, 
          parentId // Prisma acepta null si no hay padre
        }
      });
      revalidatePath("/admin/comentarios");
    } else if (postId) {
      await prisma.comentario.create({
        data: { 
          texto, 
          userId, 
          postId, 
          parentId 
        }
      });
      revalidatePath("/admin/comentarios");
    }
  } catch (error) {
    // Esto te dirá en la terminal de VS Code exactamente qué falló (ej: error de llave foránea)
    console.error("DETALLE DEL ERROR EN PRISMA:", error); 
    throw new Error("Error interno al guardar en la base de datos");
  }
}

/**
 * Elimina un comentario de forma universal (Blog o Lección)
 */
export async function eliminarComentarioUniversal(id, tipo) {
  try {
    if (tipo === 'leccion') {
      await prisma.comentarioLeccion.delete({
        where: { id: parseInt(id) }
      });
    } else {
      await prisma.comentario.delete({
        where: { id: parseInt(id) }
      });
    }
    
    // Revalidamos para que desaparezca de la vista instantáneamente
    revalidatePath("/admin/comentarios");
    revalidatePath("/"); // Revalida en general por si está en la home
  } catch (error) {
    console.error("Error al eliminar comentario:", error);
    throw new Error("No se pudo eliminar el comentario");
  }
}