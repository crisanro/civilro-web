"use client";
import { useState, useEffect } from "react";
import { guardarLeccion } from "@/actions/lecciones";
import { agregarRecurso, eliminarRecurso } from "@/actions/recursos";
import { Plus, Edit3, Video, FileText, Lock, Unlock, Download, Trash2 } from "lucide-react";
import EditorMarkdown from "@/components/EditorMarkdown";
import Link from "next/link";

export default function FormularioLeccion({ cursoId, leccionAEditar }) {
  const [contenido, setContenido] = useState(leccionAEditar?.contenido || "");

  useEffect(() => {
    setContenido(leccionAEditar?.contenido || "");
  }, [leccionAEditar]);

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm sticky top-24 max-h-[90vh] overflow-y-auto custom-scrollbar">
      <h2 className="font-black text-xl mb-6 flex items-center gap-2 text-slate-800 uppercase tracking-tighter">
        {leccionAEditar ? <Edit3 className="w-6 h-6 text-orange-500" /> : <Plus className="w-6 h-6 text-blue-600" />}
        {leccionAEditar ? "Editar Lección" : "Nueva Lección"}
      </h2>

      <form action={guardarLeccion} className="space-y-5">
        <input type="hidden" name="cursoId" value={cursoId} />
        {leccionAEditar && <input type="hidden" name="id" value={leccionAEditar.id} />}
        
        {/* TÍTULO */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Título de la clase</label>
          <input 
            name="titulo" required defaultValue={leccionAEditar?.titulo || ""}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 transition-all" 
            placeholder="Ej: Metrados en Zapatas" 
          />
        </div>

        {/* VIDEO Y DURACIÓN */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 flex items-center gap-1">
              <Video className="w-3 h-3" /> Video ID (Bunny o YouTube)
            </label>
            <input 
              name="videoUrl" defaultValue={leccionAEditar?.videoUrl || ""}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs" 
              placeholder="87db92... o link de YT" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Duración (min)</label>
            <input 
              name="duracion" defaultValue={leccionAEditar?.duracion || ""}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 font-bold" 
              placeholder="15:40" 
            />
          </div>
        </div>

        {/* EDITOR MARKDOWN */}
        <EditorMarkdown 
          label="Material Técnico de Lectura"
          name="contenido"
          value={contenido}
          onChange={setContenido}
          placeholder="Escribe el contenido detallado aquí..."
        />

        {/* PRIVACIDAD */}
        <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${leccionAEditar?.esFree ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" name="esFree" id="esFree" defaultChecked={leccionAEditar?.esFree}
              className="w-6 h-6 rounded-lg text-blue-600 accent-blue-600 cursor-pointer" 
            />
            <label htmlFor="esFree" className="text-xs font-black text-slate-700 cursor-pointer uppercase tracking-tighter">
              Clase de acceso gratuito
            </label>
          </div>
          {leccionAEditar?.esFree ? <Unlock className="w-4 h-4 text-green-600" /> : <Lock className="w-4 h-4 text-slate-400" />}
        </div>

        {/* --- SECCIÓN DE RECURSOS (SIEMPRE VISIBLE) --- */}
        <div className={`p-6 rounded-[2rem] border transition-all ${leccionAEditar ? 'bg-slate-900 border-slate-800 shadow-xl' : 'bg-slate-50 border-slate-200 border-dashed opacity-60'}`}>
          <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 mb-4 ${leccionAEditar ? 'text-slate-400' : 'text-slate-400'}`}>
            <Download className={`w-4 h-4 ${leccionAEditar ? 'text-orange-500' : 'text-slate-300'}`} /> 
            Material de Apoyo (Metadatos Pro)
          </h3>
          
          {leccionAEditar ? (
            <>
              {/* Lista de Archivos Actuales */}
              <div className="space-y-2">
                {leccionAEditar.recursos?.length > 0 ? (
                  leccionAEditar.recursos.map((rec) => (
                    <div key={rec.id} className="flex items-center justify-between bg-slate-800/50 p-3 px-4 rounded-xl border border-slate-700 group transition-all hover:border-orange-500/50">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="bg-orange-500/10 text-orange-500 text-[9px] font-black px-2 py-1 rounded-md border border-orange-500/20 uppercase">
                          {rec.tipo || 'FILE'}
                        </div>
                        <div className="truncate">
                          <p className="text-[11px] font-bold text-slate-300 uppercase tracking-tighter truncate">{rec.nombre}</p>
                          <p className="text-[9px] text-slate-500 font-bold">{rec.peso || '---'}</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={async () => {
                          if(confirm("¿Seguro que deseas eliminar este recurso?")) {
                            await eliminarRecurso(rec.id, cursoId);
                          }
                        }}
                        className="text-slate-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-slate-600 font-bold italic mb-4">No hay archivos en esta clase.</p>
                )}
              </div>

              {/* Inputs para Nuevo Recurso */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <input id="newRecName" placeholder="Nombre del recurso" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:ring-1 focus:ring-orange-500" />
                <input id="newRecUrl" placeholder="Link (Drive, Dropbox, Bunny...)" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:ring-1 focus:ring-orange-500 font-mono" />
                
                <div className="grid grid-cols-2 gap-2">
                  <select id="newRecTipo" className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-400 outline-none focus:ring-1 focus:ring-orange-500">
                    <option value="PDF">PDF</option>
                    <option value="EXCEL">EXCEL (XLSX)</option>
                    <option value="ZIP">ZIP/RAR</option>
                    <option value="DWG">DWG/CAD</option>
                    <option value="SAP">SAP/ETABS</option>
                  </select>
                  <input id="newRecPeso" placeholder="Peso (ej: 4.5 MB)" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:ring-1 focus:ring-orange-500" />
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    const nombre = document.getElementById('newRecName').value;
                    const url = document.getElementById('newRecUrl').value;
                    const tipo = document.getElementById('newRecTipo').value;
                    const peso = document.getElementById('newRecPeso').value;

                    if(!nombre || !url) return alert("Completa nombre y URL");
                    
                    const fd = new FormData();
                    fd.append("nombre", nombre);
                    fd.append("url", url);
                    fd.append("tipo", tipo);
                    fd.append("peso", peso);
                    fd.append("leccionId", leccionAEditar.id);
                    fd.append("cursoId", cursoId);
                    
                    await agregarRecurso(fd);
                    document.getElementById('newRecName').value = "";
                    document.getElementById('newRecUrl').value = "";
                    document.getElementById('newRecPeso').value = "";
                  }}
                  className="w-full bg-orange-600 hover:bg-white hover:text-orange-600 text-white text-[10px] font-black py-3 rounded-xl transition-all uppercase tracking-widest"
                >
                  Vincular Recurso
                </button>
              </div>
            </>
          ) : (
            /* ESTADO BLOQUEADO (NUEVA LECCIÓN) */
            <div className="py-10 text-center">
              <div className="bg-slate-200/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed max-w-[200px] mx-auto italic">
                Crea la lección primero para habilitar la carga de material descargable.
              </p>
            </div>
          )}
        </div>

        {/* BOTONES DE GUARDADO */}
        <div className="flex gap-3 pt-6 border-t border-slate-100">
          <button type="submit" className={`flex-1 font-black py-5 rounded-2xl transition-all shadow-xl active:scale-95 text-white tracking-widest uppercase text-xs ${leccionAEditar ? 'bg-orange-600 hover:bg-slate-900 shadow-orange-100' : 'bg-blue-600 hover:bg-slate-900 shadow-blue-100'}`}>
            {leccionAEditar ? "Actualizar Clase" : "Crear Clase"}
          </button>
          {leccionAEditar && (
            <Link href={`/admin/cursos/${cursoId}/lecciones`} className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-5 rounded-2xl font-bold text-xs uppercase tracking-tighter transition-all">
              Cancelar
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}