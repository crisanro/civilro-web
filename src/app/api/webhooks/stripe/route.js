import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db"; // Asegúrate de que esta ruta sea correcta

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  let event;

  try {
    // Validamos que el mensaje realmente viene de Stripe
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error(`❌ Error de firma: ${err.message}`);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // Manejamos el evento de pago exitoso
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Aquí recuperamos los datos que guardamos en el Checkout anterior
    const firebaseUid = session.metadata.firebaseUid;
    const planType = session.metadata.planType; // "PRO" o "UNIVERSIDAD"

    try {
      // ACTUALIZAMOS AL USUARIO EN PRISMA
      await prisma.user.update({
        where: { uid: firebaseUid },
        data: { 
          plan: planType,
          stripeCustomerId: session.customer // Guardamos el ID de Stripe por si luego quiere cancelar
        },
      });
      
      console.log(`✅ Usuario ${firebaseUid} actualizado a plan ${planType}`);
    } catch (error) {
      console.error("❌ Error actualizando usuario en DB:", error);
      return NextResponse.json({ error: "Error actualizando DB" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}