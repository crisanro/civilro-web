import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db";

// Asegúrate de tener STRIPE_SECRET_KEY en tu archivo .env.local
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // 1. Extraemos el email del formulario oculto que enviamos desde el Dashboard
    const formData = await req.formData();
    const email = formData.get("email");

    if (!email) {
      return NextResponse.redirect(new URL("/dashboard", req.url), 303);
    }

    // 2. Buscamos al usuario en la base de datos de Prisma
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // 3. LÓGICA INTELIGENTE
    // Si el usuario no existe o no tiene un ID de cliente en Stripe (es FREE)
    if (!user || !user.stripeCustomerId) {
      // Lo mandamos a la página de venta
      return NextResponse.redirect(new URL("/precios", req.url), 303);
    }

    // 4. Si es cliente (PRO/Universidad), le generamos su portal seguro
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`, 
    });

    // 5. Lo redirigimos a la página oficial de Stripe
    return NextResponse.redirect(session.url, 303);

  } catch (error) {
    console.error("Error en Stripe Portal:", error);
    return NextResponse.redirect(new URL("/dashboard", req.url), 303);
  }
}