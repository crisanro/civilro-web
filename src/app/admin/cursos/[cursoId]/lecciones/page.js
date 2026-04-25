import { prisma } from "@/lib/db";
import { guardarLeccion, eliminarLeccion } from "@/actions/lecciones";
import { ArrowLeft, Trash2, Unlock, Lock, Plus, Edit3, Video, FileText } from "lucide-react";
import Link from "next/link";
import FormularioLeccion from "@/components/admin/FormularioLeccion";

export default async function GestionLecciones({ params, searchParams }) {
  // CORRECCIÓN: Usamos cursoId porque así se llama la carpeta [cursoId]
  const { cursoId: idParam } = await params;
  const cursoId = parseInt(idParam);
  
  const { edit } = await searchParams;
  let leccionAEditar = null;

  if (edit) {
    leccionAEditar = await prisma.leccion.findUnique({
      where: { id: parseInt(edit) },
      include: { recursos: true }
    });
  }

  const curso = await prisma.curso.findUnique({
    where: { id: cursoId },
    include: { lecciones: { orderBy: { orden: "asc" } } },
  });

  if (!curso) return <div>Curso no encontrado</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      
      {/* NAVEGACIÓN SUPERIOR */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/cursos" className="p-2 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 leading-none">Gestionar Clases</h1>
            <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-bold">
              Curso: <span className="text-blue-600">{curso.titulo}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA 1: FORMULARIO (Componente de Cliente para el Editor) */}
        <div className="lg:col-span-5">
           <FormularioLeccion 
             cursoId={cursoId} 
             leccionAEditar={leccionAEditar} 
           />
        </div>

        {/* COLUMNA 2: LISTADO DE LECCIONES */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between mb-4 px-2">
             <h3 className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">Orden de las clases</h3>
             <span className="text-[10px] font-bold text-slate-400">{curso.lecciones.length} clases</span>
          </div>

          {curso.lecciones.map((lec) => (
            <div key={lec.id} className={`group bg-white p-5 rounded-[1.5rem] border transition-all flex items-center justify-between ${edit == lec.id ? 'border-orange-500 ring-2 ring-orange-100 shadow-lg scale-[1.02]' : 'border-slate-100 hover:border-blue-300'}`}>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-slate-400 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {lec.orden}
                </div>
                <div>
                  <h3 className="font-black text-slate-800 group-hover:text-blue-700 leading-tight">{lec.titulo}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    {lec.esFree && (
                      <span className="text-[9px] font-black uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100 flex items-center gap-1">
                        <Unlock className="w-2.5 h-2.5" /> Abierta
                      </span>
                    )}
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                       <Video className="w-3 h-3" /> {lec.videoUrl ? 'Bunny OK' : 'Sin Video'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/admin/cursos/${cursoId}/lecciones?edit=${lec.id}`} className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl">
                  <Edit3 className="w-5 h-5" />
                </Link>

                <form action={async () => { "use server"; await eliminarLeccion(lec.id, cursoId); }}>
                   <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl">
                     <Trash2 className="w-5 h-5" />
                   </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}