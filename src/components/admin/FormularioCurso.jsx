"use client";
import { useState } from "react";
import { crearCurso, actualizarCurso } from "@/actions/cursos";
import { Save, Image as ImageIcon, BarChart, Lock, Tag, Globe, AlignLeft, CheckCircle } from "lucide-react";
import EditorMarkdown from "@/components/EditorMarkdown";

export default function FormularioCurso({ categorias, curso = null }) {
  const [descripcion, setDescripcion] = useState(curso?.descripcion || "");

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 md:p-12">
      <form action={curso ? actualizarCurso : crearCurso} className="space-y-8">
        
        {curso && <input type="hidden" name="id" value={curso.id} />}

        {/* 1. SECCIÓN DE PORTADA */}
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-inner">
           <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-3 uppercase tracking-tighter">
             <ImageIcon className="w-6 h-6 text-orange-500" /> Identidad Visual
           </h3>
           <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">URL de Imagen (Bunny.net)</label>
                <input 
                  type="url" name="imagenUrl" 
                  defaultValue={curso?.imagenUrl || ""}
                  className="w-full bg-white border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-orange-500 outline-none font-bold"
                  placeholder="https://tu-cdn.bunny.net/portada.jpg"
                />
              </div>
           </div>
        </div>

        {/* 2. DATOS PRINCIPALES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Título de la Masterclass</label>
              <input 
                type="text" name="titulo" defaultValue={curso?.titulo || ""} required 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Slug del Curso (URL)</label>
              <input 
                type="text" name="slug" defaultValue={curso?.slug || ""} required 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                <Tag className="w-3 h-3" /> Categoría
              </label>
              <select name="categoriaId" defaultValue={curso?.categoriaId || ""} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold">
                {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                <BarChart className="w-3 h-3" /> Nivel
              </label>
              <select name="nivel" defaultValue={curso?.nivel || "Básico"} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold">
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
        </div>

        {/* --- NUEVO: RESUMEN CORTO (ACERCA DE ESTE CURSO) --- */}
        <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100 space-y-4">
          <label className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] flex items-center gap-2">
            <AlignLeft className="w-4 h-4" /> Resumen Ejecutivo (Acerca de este curso)
          </label>
          <textarea 
            name="resumen" 
            defaultValue={curso?.resumen || ""}
            rows="3"
            className="w-full bg-white border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 font-medium text-slate-600 shadow-sm outline-none"
            placeholder="Escribe el texto que aparecerá en la primera tarjeta blanca de la vista del alumno..."
          />
          <p className="text-[10px] text-slate-400 font-bold uppercase italic">Este campo rellena la sección de texto limpio arriba del temario.</p>
        </div>

        {/* 3. CONFIGURACIÓN DE ACCESO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                <Lock className="w-3 h-3" /> Restricción de Plan
              </label>
              <select name="accesoMinimo" defaultValue={curso?.accesoMinimo || "PRO"} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-orange-600">
                <option value="FREE">FREE (Abierto)</option>
                <option value="COMUNIDAD">COMUNIDAD</option>
                <option value="UNIVERSIDAD">UNIVERSIDAD</option>
                <option value="PRO">PRO</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
               <div className="flex items-center gap-3">
                 <Globe className={`w-5 h-5 ${curso?.publicado ? 'text-green-500' : 'text-slate-300'}`} />
                 <span className="text-xs font-black text-slate-600 uppercase tracking-tighter">Visibilidad: {curso?.publicado ? 'Público' : 'Borrador'}</span>
               </div>
               <input type="checkbox" name="publicado" defaultChecked={curso?.publicado} className="w-6 h-6 accent-blue-600" />
            </div>
        </div>

        {/* 4. EDITOR DE CONTENIDO (DETALLES TÉCNICOS) */}
        <div className="space-y-4 pt-4">
          <EditorMarkdown 
            label="CONTENIDO TÉCNICO Y DETALLES (MARKDOWN)"
            name="descripcion"
            value={descripcion}
            onChange={setDescripcion}
            placeholder="Aquí van los detalles técnicos, videos embebidos y metodología..."
          />
        </div>

        {/* BOTONES */}
        <div className="flex flex-col md:flex-row justify-end items-center gap-4 pt-10 border-t border-slate-100">
          <button type="submit" className="w-full md:w-auto bg-slate-900 hover:bg-orange-600 text-white px-12 py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-3 transition-all shadow-2xl active:scale-95">
            <Save className="w-6 h-6" /> {curso ? "ACTUALIZAR MASTERCLASS" : "CREAR CURSO"}
          </button>
        </div>
      </form>
    </div>
  );
}