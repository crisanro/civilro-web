import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { priceId, userEmail, userId } = await req.json();

    // 1. Creamos la sesión de Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // ID de Stripe (ej: price_1Q2W3E...)
          quantity: 1,
        },
      ],
      mode: "subscription", // Cambia a 'payment' si es pago único
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/unete`,
      customer_email: userEmail,
      
      // IMPORTANTE: Guardamos metadata para saber a quién activar el plan luego
      metadata: {
        firebaseUid: userId,
        planType: priceId === process.env.STRIPE_PRICE_ID_PRO ? "PRO" : "UNIVERSIDAD",
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error en Stripe Checkout:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}