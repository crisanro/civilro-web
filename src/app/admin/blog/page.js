import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit, MessageSquare, Eye } from "lucide-react";
import { eliminarPost } from "@/actions/blog"; // Importamos la acción que acabamos de crear
import BotonEliminarUniversal from "@/components/admin/BotonEliminarUniversal";

export default async function AdminBlog() {
  const posts = await prisma.post.findMany({
    orderBy: { fecha: "desc" },
    include: { _count: { select: { comentarios: true } } }
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Gestión del Blog</h1>
          <p className="text-slate-500">Artículos técnicos y actualizaciones de CivilRo.</p>
        </div>
        <Link 
          href="/admin/blog/nuevo" 
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 transition-all shadow-lg shadow-orange-200"
        >
          <Plus className="w-5 h-5" /> Redactar Post
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Artículo</th>
              <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Estado</th>
              <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400 text-center">Comentarios</th>
              <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <img src={post.imagenUrl} className="w-20 h-14 object-cover rounded-xl shadow-sm" />
                    <div>
                      <p className="font-bold text-slate-800 group-hover:text-orange-600 transition-colors">{post.titulo}</p>
                      <p className="text-xs text-slate-400">{new Date(post.fecha).toLocaleDateString()}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${post.publicado ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {post.publicado ? 'Publicado' : 'Borrador'}
                  </span>
                </td>
                <td className="p-6 text-center font-bold text-slate-400">
                  <div className="flex items-center justify-center gap-1">
                    <MessageSquare className="w-4 h-4" /> {post._count.comentarios}
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex justify-end gap-2">
                    {/* Ver Post */}
                    <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-blue-600 transition-all border border-transparent hover:border-slate-100">
                      <Eye className="w-5 h-5" />
                    </Link>
                    
                    {/* Editar Post */}
                    <Link href={`/admin/blog/editar/${post.id}`} className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-orange-600 transition-all border border-transparent hover:border-slate-100">
                      <Edit className="w-5 h-5" />
                    </Link>

                    {/* Eliminar Post con Confirmación de Slug */}
                    <BotonEliminarUniversal 
                      id={post.id}
                      confirmText={post.slug}
                      onConfirm={eliminarPost}
                      titulo="¿Eliminar este artículo?"
                      mensaje="Esta acción no se puede deshacer. Para confirmar la eliminación definitiva, escribe el slug del post:"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}