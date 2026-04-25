import { prisma } from "@/lib/db";
import TarjetaComentario from "@/components/admin/TarjetaComentario";
import { MessageSquare, Video, Newspaper, Inbox } from "lucide-react";
import { getSession } from "@/lib/auth"

export default async function PaginaComentariosAdmin() {
const session = await getSession(); // 1. Obtener la sesión del admin
  const adminId = session?.id; // 2. Extraer el ID (asegúrate que sea .id o .uid según tu config)
  // 1. Traemos los comentarios de LECCIONES (incluyendo sus respuestas y datos de usuario)
  const comentariosLecciones = await prisma.comentarioLeccion.findMany({
    where: { parentId: null }, // Solo traemos los "padres", las respuestas vendrán dentro del include
    orderBy: { fecha: 'desc' },
    include: {
      user: true,
      leccion: { include: { curso: true } },
      respuestas: {
        include: { user: true }
      }
    },
    take: 15
  });

  // 2. Traemos los comentarios del BLOG (incluyendo sus respuestas)
  const comentariosBlog = await prisma.comentario.findMany({
    where: { parentId: null },
    orderBy: { fecha: 'desc' },
    include: {
      user: true,
      post: true,
      respuestas: {
        include: { user: true }
      }
    },
    take: 15
  });

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Panel de Moderación</h1>
        <p className="text-slate-500 font-bold">Resuelve dudas técnicas y gestiona la comunidad de CivilRo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* COLUMNA 1: CURSOS (Dudas de Ingeniería) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4">
            <h2 className="flex items-center gap-2 font-black text-blue-600 uppercase tracking-widest text-xs">
              <Video className="w-4 h-4" /> Consultas en Clases
            </h2>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
              {comentariosLecciones.length} Recientes
            </span>
          </div>

          <div className="space-y-4">
            {comentariosLecciones.length > 0 ? (
              comentariosLecciones.map((com) => (
                <TarjetaComentario key={com.id} com={com} type="leccion" adminId={adminId} />
              ))
            ) : (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center">
                <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-400 uppercase">Sin dudas pendientes</p>
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA 2: BLOG (Comunidad) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4">
            <h2 className="flex items-center gap-2 font-black text-orange-600 uppercase tracking-widest text-xs">
              <Newspaper className="w-4 h-4" /> Comentarios del Blog
            </h2>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
              {comentariosBlog.length} Recientes
            </span>
          </div>

          <div className="space-y-4">
            {comentariosBlog.length > 0 ? (
              comentariosBlog.map((com) => (
                <TarjetaComentario key={com.id} com={com} type="blog" adminId={adminId}/>
              ))
            ) : (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center">
                <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-400 uppercase">Sin comentarios nuevos</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}