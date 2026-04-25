import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit, ListVideo, Trash2, Image as ImageIcon } from "lucide-react";
import { eliminarCurso } from "@/actions/cursos";

export const metadata = {
  title: "Cursos | Admin CivilRo",
};

export default async function AdminCursos() {
  // 1. Traemos todos los cursos de la BD, ordenados por los más nuevos
  const cursos = await prisma.curso.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      categoria: true,
      _count: {
        select: { lecciones: true } // Magia de Prisma: cuenta cuántas lecciones tiene cada uno
      }
    }
  });

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Cursos</h1>
          <p className="text-slate-500">Gestiona el catálogo de cursos y sus módulos.</p>
        </div>
        <Link 
          href="/admin/cursos/nuevo" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-1"
        >
          <Plus className="w-5 h-5" /> Nuevo Curso
        </Link>
      </div>

      {/* TABLA DE DATOS */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                <th className="p-6 font-black">Curso</th>
                <th className="p-6 font-black">Categoría</th>
                <th className="p-6 font-black">Nivel de Acceso</th>
                <th className="p-6 font-black text-center">Lecciones</th>
                <th className="p-6 font-black text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cursos.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-500">
                    No hay cursos creados todavía. Empieza haciendo clic en "Nuevo Curso".
                  </td>
                </tr>
              ) : (
                cursos.map((curso) => (
                  <tr key={curso.id} className="hover:bg-slate-50 transition-colors group">
                    
                    {/* INFO DEL CURSO */}
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 bg-slate-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center border border-slate-200">
                          {curso.imagenUrl ? (
                            <img src={curso.imagenUrl} alt={curso.titulo} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{curso.titulo}</p>
                          <p className="text-xs text-slate-500 font-mono">/{curso.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORÍA */}
                    <td className="p-6">
                      <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200">
                        {curso.categoria.nombre}
                      </span>
                    </td>

                    {/* NIVEL (PAYWALL) */}
                    <td className="p-6">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${
                        curso.accesoMinimo === 'FREE' ? 'bg-green-50 text-green-600 border-green-200' :
                        curso.accesoMinimo === 'COMUNIDAD' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                        'bg-blue-50 text-blue-600 border-blue-200'
                      }`}>
                        Plan {curso.accesoMinimo}
                      </span>
                    </td>

                    {/* CONTEO DE LECCIONES */}
                    <td className="p-6 text-center font-black text-slate-700 text-lg">
                      {curso._count.lecciones}
                    </td>

                    {/* BOTONES DE ACCIÓN */}
                    <td className="p-6">
                      <div className="flex items-center justify-end gap-2">
                        {/* Botón para administrar videos */}
                        <Link 
                          href={`/admin/cursos/${curso.id}/lecciones`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                          title="Gestionar Lecciones"
                        >
                          <ListVideo className="w-5 h-5" />
                        </Link>
                        
                        {/* Botón para editar info del curso */}
                        <Link 
                          href={`/admin/cursos/${curso.id}/editar`}
                          className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
                          title="Editar Curso"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>

                        {/* Botón para borrar */}
                        <form action={async () => {
                        "use server";
                        await eliminarCurso(curso.id);
                        }}>
                        <button 
                            type="submit"
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            title="Eliminar"
                            // Un pequeño truco de JS nativo para pedir confirmación antes de borrar
                            formAction={async (formData) => {
                            "use server";
                            await eliminarCurso(curso.id);
                            }}
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                        </form>
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