"use client";
import { useState } from "react";
import { gestionarComentario, eliminarComentarioUniversal } from "@/actions/comentarios";
import { Send, CornerDownRight, Trash2 } from "lucide-react";

// 1. Cambiamos el nombre a TarjetaComentario y añadimos export default
export default function TarjetaComentario({ com, type, adminId }) {
  const [escribiendo, setEscribiendo] = useState(false);

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden mb-6 group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <img src={com.user.imagenUrl || "/avatar.png"} className="w-8 h-8 rounded-full border border-slate-200" />
            <div>
              <p className="text-xs font-black text-slate-800">{com.user.nombre}</p>
              {/* Mostramos dónde se hizo el comentario (Lección o Post) */}
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                {type === 'leccion' ? `Clase: ${com.leccion.titulo}` : `Blog: ${com.post.titulo}`}
              </p>
            </div>
          </div>
          <button 
            onClick={() => confirm("¿Eliminar comentario?") && eliminarComentarioUniversal(com.id, type)}
            className="text-slate-200 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-slate-600 italic bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4">
          "{com.texto}"
        </p>

        {/* --- HILO DE RESPUESTAS --- */}
        {com.respuestas?.map(resp => (
          <div key={resp.id} className="ml-6 mt-3 flex gap-2 items-start text-slate-500">
            <CornerDownRight className="w-4 h-4 mt-1 text-slate-300 shrink-0" />
            <div className={`p-3 rounded-xl border w-full ${resp.user.rol === 'ADMIN' ? 'bg-orange-50 border-orange-100' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex justify-between items-center mb-1">
                <p className="text-[9px] font-black text-slate-800 uppercase">
                   {resp.user.rol === 'ADMIN' ? '⭐ Tú (Admin)' : resp.user.nombre}
                </p>
                <span className="text-[8px] text-slate-400">{new Date(resp.fecha).toLocaleDateString()}</span>
              </div>
              <p className="text-xs">{resp.texto}</p>
            </div>
          </div>
        ))}

        <div className="mt-4 flex justify-end">
          <button 
            onClick={() => setEscribiendo(!escribiendo)}
            className="text-[10px] font-black text-slate-400 hover:text-orange-600 uppercase tracking-widest transition-all"
          >
            {escribiendo ? "Cancelar" : "Responder consulta"}
          </button>
        </div>
      </div>

      {/* INPUT DE RESPUESTA RÁPIDA */}
      {escribiendo && (
        <form 
          action={async (fd) => {
            await gestionarComentario(fd);
            setEscribiendo(false);
          }} 
          className="p-4 bg-slate-900 flex gap-2"
        >
          <input type="hidden" name="parentId" value={com.id} />
          {type === 'leccion' ? (
            <input type="hidden" name="leccionId" value={com.leccionId} />
          ) : (
            <input type="hidden" name="postId" value={com.postId} />
          )}
          <input type="hidden" name="userId" value={adminId} />
          
          <input 
            name="texto"
            required
            placeholder="Escribe la respuesta técnica..."
            className="flex-1 bg-slate-800 border-none rounded-xl px-4 py-2 text-xs text-white outline-none focus:ring-1 focus:ring-orange-500"
          />
          <button className="bg-orange-600 text-white p-2 rounded-xl hover:bg-white hover:text-orange-600 transition-all">
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}