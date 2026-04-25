// src/lib/auth.js
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("civilro_session"); // Tu cookie real
  
  if (!sessionCookie) return null;

  try {
    // 1. Extraemos los datos de la cookie de Firebase (suele tener el email o uid)
    const sessionData = JSON.parse(sessionCookie.value);
    
    if (!sessionData || !sessionData.email) return null;

    // 2. Buscamos a ese usuario en Prisma para tener su PLAN y ROL reales y actualizados
    const user = await prisma.user.findUnique({
      where: { email: sessionData.email }, 
    });

    return user; // ¡Listo! Esto devuelve toda la info de la BD, incluyendo rol y plan.
  } catch (error) {
    console.error("Error leyendo la sesión:", error);
    return null;
  }
}