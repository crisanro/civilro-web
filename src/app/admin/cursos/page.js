import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit, ListVideo, Image as ImageIcon } from "lucide-react";
import { eliminarCurso } from "@/actions/cursos";
import BotonEliminarUniversal from "@/components/admin/BotonEliminarUniversal";

export const metadata = {
  title: "Cursos | Admin CivilRo",
};

export default async function AdminCursos() {
  const cursos = await prisma.curso.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      categoria: true,
      _count: {
        select: { lecciones: true }
      }
    }
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Gestión de Cursos</h1>
          <p className="text-slate-500">Gestiona el catálogo académico y sus módulos de video.</p>
        </div>
        <Link 
          href="/admin/cursos/nuevo" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-1"
        >
          <Plus className="w-5 h-5" /> Nuevo Curso
        </Link>
      </div>

      {/* TABLA DE DATOS */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs uppercase tracking-widest">
                <th className="p-6 font-black">Curso</th>
                <th className="p-6 font-black">Categoría</th>
                <th className="p-6 font-black">Acceso</th>
                <th className="p-6 font-black text-center">Lecciones</th>
                <th className="p-6 font-black text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {cursos.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">
                    No hay cursos creados todavía.
                  </td>
                </tr>
              ) : (
                cursos.map((curso) => (
                  <tr key={curso.id} className="hover:bg-slate-50/50 transition-colors group">
                    
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 bg-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-slate-200 shadow-sm">
                          {curso.imagenUrl ? (
                            <img src={curso.imagenUrl} alt={curso.titulo} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-slate-300" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{curso.titulo}</p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">/{curso.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-6">
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {curso.categoria.nombre}
                      </span>
                    </td>

                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        curso.accesoMinimo === 'FREE' ? 'bg-green-50 text-green-600 border-green-100' :
                        curso.accesoMinimo === 'COMUNIDAD' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                        'bg-blue-50 text-blue-600 border-blue-100'
                      }`}>
                        Plan {curso.accesoMinimo}
                      </span>
                    </td>

                    <td className="p-6 text-center font-black text-slate-400 text-lg">
                      {curso._count.lecciones}
                    </td>

                    <td className="p-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/cursos/${curso.id}/lecciones`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100"
                          title="Gestionar Lecciones"
                        >
                          <ListVideo className="w-5 h-5" />
                        </Link>
                        
                        <Link 
                          href={`/admin/cursos/${curso.id}/editar`}
                          className="p-2 text-slate-400 hover:text-orange-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100"
                          title="Editar Curso"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>

                        {/* EL BOTÓN UNIVERSAL REUTILIZABLE */}
                        <BotonEliminarUniversal 
                          id={curso.id}
                          confirmText={curso.slug}
                          onConfirm={eliminarCurso}
                          titulo="¿Eliminar Curso Completo?"
                          mensaje="Atención: Se borrarán todas las lecciones y recursos asociados. Para confirmar, escribe el slug del curso:"
                        />
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}