//src/app/blog/page.js


import { prisma } from "@/lib/db";
import BlogList from "@/components/blog/BlogList";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { publicado: true },
    orderBy: { fecha: 'desc' }
  });

  return (
    <main className="bg-slate-50 min-h-screen pb-32">
      {/* Cabecera Brutalista CivilRo */}
      <header className="pt-32 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-block bg-orange-100 text-orange-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6">
            Conocimiento Técnico
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
            Blog <span className="text-orange-600">CivilRo</span>
          </h1>
          <p className="text-xl text-slate-400 mt-8 font-bold max-w-2xl mx-auto leading-relaxed">
            Explora las últimas tendencias en ingeniería, software estructural y gestión de proyectos.
          </p>
        </div>
      </header>

      {/* Renderizamos la lista filtrable */}
      <BlogList posts={posts} />
    </main>
  );
}