import { getSession } from "@/lib/auth"; 
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getSession(); // Esta función ya hace el JSON.parse internamente

    if (!user) {
      return NextResponse.json({ loggedIn: false });
    }

    // Devolvemos los datos que vienen directamente de la base de datos
    return NextResponse.json({ 
      loggedIn: true, 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        rol: user.rol, // Asegúrate que en tu Prisma se llame 'rol'
        plan: user.plan
      }
    });
  } catch (error) {
    console.error("Error en API session:", error);
    return NextResponse.json({ loggedIn: false }, { status: 500 });
  }
}