"use client";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useEffect, useState, Suspense } from "react"; // Añadimos Suspense
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// 1. Creamos un componente interno para la lógica del Checkout
function CheckoutForm() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (!plan) return;

    fetch("/api/stripe/checkout", {
      method: "POST",
      body: new URLSearchParams({ plan }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [plan]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-black text-center text-slate-900 mb-8 uppercase tracking-tighter">
        Finaliza tu compra: Plan {plan || "Seleccionado"}
      </h1>
      
      <div className="bg-white p-4 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 min-h-[400px]">
        {clientSecret ? (
          <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        ) : (
          <div className="h-96 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Preparando pasarela segura...</p>
          </div>
        )}
      </div>
    </div>
  );
}

// 2. El componente principal exporta el Suspense Boundary
export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20 px-6">
      {/* Suspense es OBLIGATORIO en Next.js cuando usas useSearchParams 
          en páginas que se generan estáticamente. Esto evitará que 
          Docker falle al hacer el 'npm run build'.
      */}
      <Suspense fallback={
        <div className="max-w-3xl mx-auto text-center py-20">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm font-bold text-slate-500 uppercase">Cargando Checkout...</p>
        </div>
      }>
        <CheckoutForm />
      </Suspense>
    </main>
  );
}
