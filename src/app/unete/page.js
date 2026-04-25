"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase"; // Tu config de Firebase
import { onAuthStateChanged } from "firebase/auth";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Unete() {
  const [user, setUser] = useState(null);

  // Escuchar si el usuario está logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSubscription = async (priceId) => {
    if (!user) {
      alert("Por favor, inicia sesión primero para poder suscribirte.");
      return;
    }

    const stripe = await stripePromise;
    
    // Llamada a tu API de Checkout
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ 
        priceId, 
        userEmail: user.email, 
        userId: user.uid 
      }),
      headers: { "Content-Type": "application/json" }
    });
    
    const session = await response.json();

    if (session.error) {
      alert("Error: " + session.error);
      return;
    }

    // Redirigir a Stripe
    await stripe.redirectToCheckout({ sessionId: session.sessionId });
  };

  return (
    <div className="bg-white min-h-screen py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
          Invierte en tu <span className="text-orange-600">futuro.</span>
        </h1>
        <p className="text-xl text-slate-500 mb-16 max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a tu etapa actual, desde la universidad hasta el campo profesional.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* PLAN UNIVERSIDAD */}
          <div className="border-2 border-slate-100 p-10 rounded-3xl hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Plan Universidad</h3>
            <p className="text-slate-500 mb-6">Apoyo académico para tus años de facultad.</p>
            <div className="text-4xl font-black mb-8 text-slate-900">$15<span className="text-lg font-normal text-slate-400">/mes</span></div>
            
            <ul className="text-left space-y-4 mb-10">
              <li className="flex items-center gap-3">✅ Cursos de apoyo académico</li>
              <li className="flex items-center gap-3">✅ Plantillas básicas de Excel</li>
              <li className="flex items-center gap-3">✅ Acceso al blog exclusivo</li>
            </ul>

            <button 
              onClick={() => handleSubscription(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_UNIVERSIDAD)}
              className="w-full border-2 border-slate-900 text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition-all"
            >
              Elegir Universidad
            </button>
          </div>

          {/* PLAN PRO (Destacado) */}
          <div className="border-2 border-slate-900 p-10 rounded-3xl shadow-[15px_15px_0px_0px_rgba(15,23,42,1)] bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-600 text-white px-4 py-1 text-xs font-black uppercase tracking-widest">
              Popular
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Acceso Total Pro</h3>
            <p className="text-slate-500 mb-6">De la facultad a la práctica profesional real.</p>
            <div className="text-4xl font-black mb-8 text-slate-900">$29<span className="text-lg font-normal text-slate-400">/mes</span></div>
            
            <ul className="text-left space-y-4 mb-10">
              <li className="flex items-center gap-3 font-bold text-slate-900">✅ Todos los cursos (Sin límites)</li>
              <li className="flex items-center gap-3 text-slate-700">✅ Notificaciones Push VIP de obra</li>
              <li className="flex items-center gap-3 text-slate-700">✅ Plantillas de Metrados y Presupuestos</li>
              <li className="flex items-center gap-3 text-slate-700">✅ Certificados de CivilRo</li>
            </ul>

            <button 
              onClick={() => handleSubscription(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO)}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all"
            >
              Obtener Acceso Pro
            </button>
          </div>

        </div>

        <p className="mt-20 text-slate-400 text-sm">
          Pausa o cancela tu suscripción cuando quieras. Pagos seguros vía Stripe.
        </p>
      </div>
    </div>
  );
}