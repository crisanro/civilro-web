import { NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from "next/headers";

// Inicializamos Stripe con la llave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // 1. Leemos qué plan eligió el usuario desde el formulario
    const formData = await req.formData();
    const plan = formData.get("plan");

    // 2. Verificamos quién es el usuario actual leyendo la cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("civilro_session");

    if (!sessionCookie) {
      // Si por alguna razón llegó aquí sin sesión, lo mandamos al login
      return NextResponse.redirect(new URL("/login", req.url), 303);
    }

    const { email, id: userId } = JSON.parse(sessionCookie.value);

    // 3. Asignamos el Price ID correcto según el botón que presionó
    let priceId;
    if (plan === "UNIVERSIDAD") {
      priceId = process.env.STRIPE_PRICE_UNIVERSIDAD;
    } else if (plan === "PRO") {
      priceId = process.env.STRIPE_PRICE_PRO;
    }

    if (!priceId) {
      console.error(`Falta configurar STRIPE_PRICE_${plan} en el .env`);
      return NextResponse.redirect(new URL("/precios?error=missing_price", req.url), 303);
    }

    // 4. Creamos la sesión de Checkout en MODO EMBEBIDO
    const checkoutSession = await stripe.checkout.sessions.create({
      ui_mode: 'embedded_page', // ¡AQUÍ ESTÁ EL CAMBIO!
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email, 
      client_reference_id: userId.toString(), 
      
      // En modo embebido, usamos return_url en lugar de success/cancel
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    });

    // 5. Devolvemos el secreto al frontend en lugar de redirigir
    return NextResponse.json({ clientSecret: checkoutSession.client_secret });

  } catch (error) {
    console.error("Error al crear Checkout de Stripe:", error);
    return NextResponse.json({ error: "No se pudo iniciar el pago" }, { status: 500 });
  }
}