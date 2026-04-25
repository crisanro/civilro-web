"use client";
import { useState, useRef } from "react";
import { User, Upload, Check } from "lucide-react";
import { actualizarPerfil } from "@/actions/perfil";

export default function FormularioPerfil({ usuario }) {
  const [nombre, setNombre] = useState(usuario.nombre || "");
  const [fotoPreview, setFotoPreview] = useState(usuario.avatarUrl || null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Creamos una URL temporal para mostrar la previsualización al instante
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("email", usuario.email);
    formData.append("nombre", nombre);

    if (file) {
        // --- MAGIA: COMPRESIÓN EN EL CLIENTE ---
        const compressedFile = await compressImage(file);
        formData.append("foto", compressedFile, "avatar.webp");
    }

    const res = await actualizarPerfil(formData);
    setIsLoading(false);
    
    if (res.success) alert("¡Perfil actualizado!");
    else alert("Error: " + res.error);
    };

    // Función para procesar la imagen en el navegador
    const compressImage = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const size = 400; // El tamaño que queremos
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");

            // Calculamos el recorte (Crop) para que sea cuadrado perfecto
            const sourceSize = Math.min(img.width, img.height);
            const sourceX = (img.width - sourceSize) / 2;
            const sourceY = (img.height - sourceSize) / 2;

            ctx.drawImage(img, sourceX, sourceY, sourceSize, sourceSize, 0, 0, size, size);

            // Convertimos a Blob (WebP de baja calidad)
            canvas.toBlob((blob) => {
            resolve(blob);
            }, "image/webp", 0.6); // 0.6 es la calidad (60%)
        };
        };
    });
    };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start">
      
      {/* SECCIÓN DEL AVATAR */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-32 h-32 rounded-full border-4 border-slate-100 shadow-inner overflow-hidden bg-slate-50 flex items-center justify-center shrink-0">
            {/* Usamos el nombre de campo correcto: imagenUrl */}
            {usuario?.imagenUrl ? (
                <img 
                src={usuario.imagenUrl} 
                alt="Avatar" 
                className="w-full h-full object-cover" 
                />
            ) : (
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide lucide-user w-12 h-12 text-slate-300"
                >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
                </svg>
            )}
        </div>
        
        <button 
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="text-xs font-bold uppercase tracking-widest text-orange-600 hover:text-slate-900 transition-colors flex items-center gap-2"
        >
          <Upload className="w-4 h-4" /> Cambiar Foto
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFotoChange} 
          accept="image/jpeg, image/png, image/webp"
          className="hidden" 
        />
      </div>

      {/* SECCIÓN DE DATOS */}
      <div className="flex-1 w-full space-y-4">
        <div>
          <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">
            Nombre Público
          </label>
          <input 
            type="text" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Ing. Cristhian Romero"
            className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-orange-500 font-bold text-slate-700 transition-colors"
          />
        </div>
        
        <div className="pt-2">
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? "Guardando..." : <><Check className="w-4 h-4" /> Guardar Cambios</>}
          </button>
        </div>
      </div>
    </form>
  );
}