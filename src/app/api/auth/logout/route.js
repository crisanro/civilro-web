import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  // 1. Borramos la cookie de sesión de forma segura
  const cookieStore = await cookies();
  cookieStore.delete("civilro_session");

  // 2. Redirección HTTP nativa (Código 303 See Other)
  // Al no usar JavaScript en el botón, el servidor "empuja" al navegador a la Home.
  return NextResponse.redirect(new URL("/", req.url), 303);
}