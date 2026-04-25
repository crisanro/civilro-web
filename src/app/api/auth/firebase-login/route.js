import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, nombre, uid } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Faltan datos de Firebase" }, { status: 400 });
    }

    // 1. Buscamos al usuario en Prisma, o lo CREAMOS si es su primera vez
    // Usamos upsert: si lo encuentra, lo actualiza (aquí no actualizamos nada, por eso update está vacío). 
    // Si no lo encuentra, lo crea.
    const user = await prisma.user.upsert({
      where: { email: email },
      update: {}, 
      create: {
        email: email,
        nombre: nombre || email.split('@')[0],
        uid: uid,
        plan: "FREE", // Todos entran como FREE por defecto
      }
    });

    // 2. Creamos la sesión de CivilRo (La Cookie)
    const sessionData = {
      email: user.email,
      id: user.id,
      plan: user.plan
    };

    const cookieStore = await cookies();
    cookieStore.set("civilro_session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // La sesión dura 7 días
      path: "/",
    });

    return NextResponse.json({ success: true, user });

  } catch (error) {
    console.error("Error en sincronización Firebase-Prisma:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}