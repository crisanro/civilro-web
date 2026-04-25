"use client";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Iniciamos Stripe con tu llave pública
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan"); // Leemos si quiere PRO o UNIVERSIDAD
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (!plan) return;

    // Pedimos el secreto a nuestra API al cargar la página
    fetch("/api/stripe/checkout", {
      method: "POST",
      body: new URLSearchParams({ plan }), // Enviamos el plan
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [plan]);

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-center text-slate-900 mb-8">
          Finaliza tu compra: Plan {plan}
        </h1>
        
        <div className="bg-white p-4 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100">
          {clientSecret ? (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          ) : (
            <div className="h-96 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}