"use client";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useMemo } from "react";

// Cargamos el editor dinámicamente para no romper el renderizado del servidor (SSR)
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export default function EditorMarkdown({ label, name, value, onChange, placeholder }) {
  
  const options = useMemo(() => ({
    spellChecker: false,
    placeholder: placeholder || "Escribe aquí...",
    status: false,
    minHeight: "250px",
    toolbar: [
      "bold", "italic", "heading", "|", 
      "quote", "unordered-list", "ordered-list", "|", 
      "link", "image", "|", 
      "preview", "side-by-side", "fullscreen"
    ],
  }), [placeholder]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-slate-700">{label}</label>
      <div className="prose-editor border border-slate-200 rounded-2xl overflow-hidden">
        <SimpleMDE 
          value={value} 
          onChange={onChange} 
          options={options} 
        />
        {/* Input oculto para que el formulario (Server Action) recoja el valor */}
        <input type="hidden" name={name} value={value} />
      </div>
    </div>
  );
}