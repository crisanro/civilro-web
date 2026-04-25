"use client";
import { useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { Turnstile } from "@marsidev/react-turnstile"; // Importar componente

export default function AuthModal() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: Código OTP
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null); // Estado para el token de Cloudflare

  // 1. Login con Google
  const handleGoogleLogin = async () => {
    try {
      // 1. Firebase hace su magia y loguea al usuario
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // 2. Le avisamos a nuestro servidor de Next.js para crear la sesión y guardarlo en Prisma
      const res = await fetch("/api/auth/firebase-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: user.email, 
          nombre: user.displayName,
          uid: user.uid 
        }),
      });

      if (res.ok) {
        // 3. ¡Éxito! A recargar la página para que el middleware lo mande al Dashboard
        window.location.href = "/dashboard";
      } else {
        alert("Error al sincronizar la cuenta.");
      }
    } catch (error) {
      console.error("Error Google:", error);
    }
  };

  // 2. Paso 1: Enviar Código (Validando Captcha)
  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!captchaToken) return alert("Por favor, completa la verificación de seguridad.");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        body: JSON.stringify({ email, captchaToken }), // Enviamos el token al servidor
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al enviar el código");
        return;
      }

      setStep(2);
    } catch (error) {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  // 3. Paso 2: Verificar Código
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        body: JSON.stringify({ email, code }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Código inválido");
        return;
      }

      window.location.href = "/dashboard";
    } catch (error) {
      alert("Error al verificar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full border border-slate-100 text-slate-900">
      <h2 className="text-3xl font-black mb-2 tracking-tighter">
        {step === 1 ? "Únete a CivilRo" : "Verifica tu cuenta"}
      </h2>
      <p className="text-slate-500 mb-8">
        {step === 1 ? "Accede a la comunidad de ingenieros." : `Enviamos un código a ${email}`}
      </p>

      {step === 1 && (
        <>
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border-2 border-slate-200 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all mb-6"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5" alt="google" />
            Continuar con Google
          </button>

          <div className="relative my-8 text-center">
            <hr className="border-slate-100" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-slate-400 text-sm">o con código de 6 dígitos</span>
          </div>

          <form onSubmit={handleSendCode} className="space-y-4">
            <input 
              type="email" 
              placeholder="tu@correo.com"
              className="w-full px-4 py-4 rounded-xl border-2 border-slate-100 focus:border-orange-500 outline-none font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* WIDGET DE CLOUDFLARE TURNSTILE */}
            <div className="flex justify-center py-2">
              <Turnstile 
                siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY} 
                onSuccess={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
              />
            </div>

            <button 
              disabled={loading || !captchaToken}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Recibir código"}
            </button>
          </form>
        </>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <input 
            type="text" 
            maxLength={6}
            placeholder="000000"
            className="w-full px-4 py-4 rounded-xl border-2 border-orange-500 text-center text-3xl font-black tracking-[0.5em] outline-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button 
            disabled={loading}
            className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-slate-900 transition-all disabled:opacity-50"
          >
            {loading ? "Verificando..." : "Entrar ahora"}
          </button>
          <button 
            type="button"
            onClick={() => setStep(1)}
            className="w-full text-slate-400 text-sm font-bold"
          >
            Volver a intentar
          </button>
        </form>
      )}
    </div>
  );
}