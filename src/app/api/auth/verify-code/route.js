import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { email, code } = await req.json();

    const record = await prisma.verificationToken.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' }
    });

    if (!record) {
      return NextResponse.json({ error: "No se encontró un código." }, { status: 404 });
    }

    if (new Date() > record.expires) {
      return NextResponse.json({ error: "El código ha expirado." }, { status: 400 });
    }

    if (record.attempts >= 3) {
      return NextResponse.json({ error: "Demasiados intentos. Pide uno nuevo." }, { status: 403 });
    }

    if (record.token !== code) {
      await prisma.verificationToken.update({
        where: { id: record.id },
        data: { attempts: { increment: 1 } }
      });
      const intentosRestantes = 3 - (record.attempts + 1);
      return NextResponse.json({ error: `Código incorrecto. Quedan ${intentosRestantes}.` }, { status: 400 });
    }

    // --- 5. TODO CORRECTO: CREAR SESIÓN ---
    
    // Borramos el token usado
    await prisma.verificationToken.delete({ where: { id: record.id } });

    // Creamos la Cookie de sesión
    const cookieStore = await cookies();
    cookieStore.set("civilro_session", JSON.stringify({ email }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 semana de duración
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Acceso concedido" });

  } catch (error) {
    console.error("Error en verify-code:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}