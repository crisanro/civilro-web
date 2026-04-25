"use client";
import { useState } from "react";
import { crearPost, actualizarPost } from "@/actions/blog";
import { agregarRecurso, eliminarRecurso } from "@/actions/recursos";
import { Save, Download, Trash2, Lock } from "lucide-react";
import EditorMarkdown from "@/components/EditorMarkdown";

export default function FormularioBlog({ post = null }) {
  const [contenido, setContenido] = useState(post?.contenido || "");

  return (
    <form action={post ? actualizarPost : crearPost} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {post && <input type="hidden" name="id" value={post.id} />}
      
      {/* CONTENEDOR IZQUIERDO (Ocupa 2 columnas) */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* BLOQUE 1: EDITOR */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-black uppercase text-slate-400 mb-2">Título del Post</label>
            <input 
              name="titulo" defaultValue={post?.titulo || ""} required 
              className="w-full bg-slate-50 border-none rounded-2xl p-4 text-2xl font-black focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Ej: Análisis Sísmico de Reservorios..."
            />
          </div>

          <EditorMarkdown 
            label="CONTENIDO DEL ARTÍCULO"
            name="contenido"
            value={contenido}
            onChange={setContenido}
            placeholder="Redacta con Markdown..."
          />
        </div>

        {/* BLOQUE 2: RECURSOS */}
        <div className={`p-8 rounded-[2.5rem] border transition-all ${post ? 'bg-slate-900 border-slate-800 shadow-xl' : 'bg-slate-50 border-slate-200 border-dashed opacity-60'}`}>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-6">
            <Download className="w-4 h-4 text-orange-500" /> Material Técnico (Metadatos Pro)
          </h3>

          {post ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {post.recursos?.map((rec) => (
                  <div key={rec.id} className="flex items-center justify-between bg-slate-800/50 p-3 px-4 rounded-xl border border-slate-700 group">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-orange-500/10 text-orange-500 text-[9px] font-black px-2 py-1 rounded-md border border-orange-500/20 uppercase tracking-tighter">
                        {rec.tipo || 'FILE'}
                      </div>
                      <div className="truncate">
                        <p className="text-[10px] font-bold text-slate-200 uppercase tracking-tighter truncate">{rec.nombre}</p>
                        <p className="text-[9px] text-slate-500 font-bold">{rec.peso || '---'}</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => eliminarRecurso(rec.id, null, post.id)} 
                      className="text-slate-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 border-t border-slate-800 space-y-3">
                <input id="recNom" placeholder="Nombre: Ej. Tabla de Aceros" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:ring-1 focus:ring-orange-500" />
                <input id="recUrl" placeholder="URL del archivo" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:ring-1 focus:ring-orange-500 font-mono" />
                <div className="grid grid-cols-2 gap-3">
                  <select id="recTipo" className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-400 outline-none">
                    <option value="PDF">PDF</option>
                    <option value="EXCEL">EXCEL</option>
                    <option value="ZIP">ZIP/RAR</option>
                    <option value="DWG">DWG/CAD</option>
                  </select>
                  <input id="recPeso" placeholder="Peso: Ej. 1.2 MB" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none" />
                </div>
                <button 
                  type="button"
                  onClick={async () => {
                    const nombre = document.getElementById('recNom').value;
                    const url = document.getElementById('recUrl').value;
                    const tipo = document.getElementById('recTipo').value;
                    const peso = document.getElementById('recPeso').value;
                    if(!nombre || !url) return alert("Nombre y URL son obligatorios");

                    const fd = new FormData();
                    fd.append("nombre", nombre);
                    fd.append("url", url);
                    fd.append("tipo", tipo);
                    fd.append("peso", peso);
                    fd.append("postId", post.id);
                    await agregarRecurso(fd);
                    document.getElementById('recNom').value = "";
                    document.getElementById('recUrl').value = "";
                    document.getElementById('recPeso').value = "";
                  }}
                  className="w-full bg-orange-600 text-white text-[10px] font-black py-4 rounded-xl uppercase tracking-widest"
                >
                  Añadir Recurso al Blog
                </button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center border-2 border-dashed border-slate-200 rounded-[2rem]">
              <Lock className="w-6 h-6 text-slate-300 mx-auto mb-3" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-10 leading-relaxed">
                Primero publica el artículo para habilitar descargas.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* COLUMNA DERECHA (Barra lateral) */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4 sticky top-24">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Imagen Portada</label>
            <input name="imagenUrl" defaultValue={post?.imagenUrl || ""} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm" placeholder="URL de Bunny" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Slug</label>
            <input name="slug" defaultValue={post?.slug || ""} required className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Resumen SEO</label>
            <textarea name="resumen" defaultValue={post?.resumen || ""} rows="4" className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm"></textarea>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <label className="text-xs font-bold text-slate-600 uppercase">Publicado</label>
            <input type="checkbox" name="publicado" defaultChecked={post?.publicado} className="w-5 h-5 accent-orange-600" />
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-orange-600 transition-all uppercase text-xs tracking-widest">
            <Save className="w-5 h-5" /> {post ? "Actualizar Post" : "Publicar Ahora"}
          </button>
        </div>
      </div>
    </form>
  );
}