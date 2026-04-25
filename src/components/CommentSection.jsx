"use client";
import { useState } from "react";
import { gestionarComentario, eliminarComentarioUniversal } from "@/actions/comentarios";
import { Send, User, Trash2, MessageCircle } from "lucide-react";

export default function CommentSection({ 
  usuarioActual, // Objeto con id, nombre, imagen
  leccionId = null, 
  postId = null, 
  comentarios = [] 
}) {
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleEnviar = async () => {
    // 1. Verificación de seguridad
    if (!usuarioActual) {
      alert("Debes iniciar sesión para comentar");
      return;
    }
    
    if (!texto.trim()) return;
    setEnviando(true);

    const fd = new FormData();
    fd.append("texto", texto);
    // 2. Uso opcional por si acaso
    fd.append("userId", usuarioActual?.id); 
    
    if (leccionId) fd.append("leccionId", leccionId);
    if (postId) fd.append("postId", postId);

    await gestionarComentario(fd);
    setTexto("");
    setEnviando(false);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <h3 className="text-sm font-black text-slate-800 uppercase tracking-tighter mb-6 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-orange-500" /> 
        Discusión de la Comunidad
      </h3>

      {/* INPUT PARA ESCRIBIR */}
      <div className="flex gap-4 mb-10">
        <img 
          src={usuarioActual?.imagenUrl || "/avatar.png"} 
          className="w-10 h-10 rounded-2xl object-cover shadow-sm"
        />
        <div className="flex-1 relative">
          <textarea 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none text-sm text-slate-700"
            placeholder={leccionId ? "Plantea tu duda técnica..." : "Deja tu opinión sobre el artículo..."}
            rows="2"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          ></textarea>
          <button 
            onClick={handleEnviar}
            disabled={enviando}
            className="absolute right-3 bottom-3 p-2 bg-slate-900 text-white rounded-xl hover:bg-orange-600 disabled:opacity-50 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* LISTA DE HILOS */}
      <div className="space-y-8">
        {comentarios.map((com) => (
          <div key={com.id} className="group">
            <div className="flex gap-4">
              <img src={com.user.imagenUrl} className="w-10 h-10 rounded-2xl object-cover" />
              <div className="flex-1">
                <div className="bg-slate-50 p-5 rounded-[1.5rem] rounded-tl-none border border-slate-100 relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-black text-slate-900 text-xs uppercase tracking-tighter">
                      {com.user.nombre} {com.user.rol === 'ADMIN' && "🏢"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {new Date(com.fecha).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{com.texto}</p>

                  {/* BOTÓN ELIMINAR: Solo si es dueño Y no tiene respuestas */}
                  {com.userId === usuarioActual?.id && (!com.respuestas || com.respuestas.length === 0) && (
                    <button 
                      onClick={() => confirm("¿Borrar comentario?") && eliminarComentarioUniversal(com.id, leccionId ? 'leccion' : 'blog')}
                      className="absolute -right-2 -top-2 p-2 bg-white text-slate-300 hover:text-red-500 rounded-full border border-slate-100 shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* RESPUESTAS (HILOS) */}
                {com.respuestas?.map((res) => (
                  <div key={res.id} className="ml-8 mt-4 flex gap-3 border-l-2 border-slate-100 pl-4">
                    <img src={res.user.imagenUrl} className="w-8 h-8 rounded-xl object-cover" />
                    <div className={`p-4 rounded-2xl flex-1 ${res.user.rol === 'ADMIN' ? 'bg-orange-50 border border-orange-100' : 'bg-white border border-slate-100'}`}>
                      <p className="text-[10px] font-black text-slate-800 uppercase mb-1">
                        {res.user.nombre} {res.user.rol === 'ADMIN' && <span className="text-orange-600 ml-1">(PROFESOR)</span>}
                      </p>
                      <p className="text-xs text-slate-600">{res.texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}