"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function actualizarPlanUsuario(usuarioId, nuevoPlan) {
  await prisma.user.update({
    where: { id: usuarioId },
    data: { plan: nuevoPlan }
  });
  revalidatePath("/admin/usuarios");
}

export async function cambiarRolUsuario(usuarioId, nuevoRol) {
  await prisma.user.update({
    where: { id: usuarioId },
    data: { rol: nuevoRol }
  });
  revalidatePath("/admin/usuarios");
}

export async function buscarUsuarios(query) {
  return await prisma.user.findMany({
    where: {
      OR: [
        { email: { contains: query, mode: 'insensitive' } },
        { nombre: { contains: query, mode: 'insensitive' } }
      ]
    },
    take: 10 // Para no saturar si hay muchos
  });
}

export async function actualizarEstadoUsuario(userId, data) {
  await prisma.user.update({
    where: { id: userId },
    data: data, // Aquí puede venir { plan: 'PRO' } o { rol: 'ADMIN' }
  });
  revalidatePath(`/admin/usuarios/${userId}`);
}