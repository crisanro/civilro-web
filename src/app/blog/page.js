import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { publicado: true },
    orderBy: { fecha: 'desc' }
  });

  return (
    <main className="bg-white min-h-screen pb-20">
      {/* Cabecera del Blog */}
      <header className="py-24 border-b border-slate-100 mb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter">
            Blog <span className="text-orange-600">CivilRo</span>
          </h1>
          <p className="text-xl text-slate-500 mt-4 font-medium">
            Artículos técnicos, guías y consejos sobre ingeniería y construcción.
          </p>
        </div>
      </header>

      {/* Lista de Artículos */}
      <div className="max-w-4xl mx-auto px-6 space-y-20">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.id} className="group relative">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="flex-1">
                    <time className="text-sm font-bold text-orange-600 uppercase tracking-widest">
                      {new Date(post.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                    <h2 className="text-4xl font-bold text-slate-900 mt-3 group-hover:text-blue-700 transition-colors leading-tight">
                      {post.titulo}
                    </h2>
                    <p className="text-lg text-slate-600 mt-4 leading-relaxed line-clamp-3">
                      {post.resumen}
                    </p>
                    <div className="mt-8 flex items-center gap-2 font-bold text-slate-900">
                      Leer más 
                      <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                  </div>
                  
                  {post.imagenUrl && (
                    <div className="w-full md:w-72 aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden shadow-sm">
                      <img src={post.imagenUrl} alt={post.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))
        ) : (
          <p className="text-center py-20 text-slate-400 italic">No hay artículos publicados aún.</p>
        )}
      </div>
    </main>
  );
}