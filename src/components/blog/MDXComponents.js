// src/components/blog/MDXComponents.js
import CalculadoraZapata from "@/components/calculadoras/CalculadoraZapata";

export const mdxComponents = {
  CalculadoraZapata,
  Prueba: () => <div className="p-10 bg-red-500 text-white font-black text-3xl">¡EL RENDERIZADOR FUNCIONA!</div>
};