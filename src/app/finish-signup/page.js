"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function FinishSignup() {
  const [status, setStatus] = useState("Verificando tu acceso...");
  const router = useRouter();

  useEffect(() => {
    // 1. Verificar si es un link de login válido
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      
      // Si el usuario abrió el link en otro navegador, se lo pedimos de nuevo
      if (!email) {
        email = window.prompt("Por favor, confirma tu correo para finalizar el acceso");
      }

      // 2. Completar el inicio de sesión
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
          setStatus("¡Acceso concedido! Redirigiendo...");
          setTimeout(() => router.push("/"), 2000);
        })
        .catch((error) => {
          console.error(error);
          setStatus("El enlace expiró o ya fue usado.");
        });
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-slate-900">{status}</h1>
      </div>
    </div>
  );
}