// src/app/cursos/page.js
import CourseCard from "@/components/CourseCard";
import { prisma } from "@/lib/db";

export default async function CursosPage() {
  // Esta línea es la magia: consulta a Postgres en el servidor
  const cursos = await prisma.curso.findMany({
    include: {
      categoria: true // Trae también el nombre de la categoría
    }
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-black text-slate-900 mb-12">Catálogo Real</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cursos.length > 0 ? (
          cursos.map((curso) => (
            <CourseCard 
              key={curso.id} 
              title={curso.titulo}
              category={curso.categoria.nombre} 
              level={curso.nivel}
              slug={curso.slug}
            />
          ))
        ) : (
          <p className="text-slate-500">Todavía no hay cursos. ¡Ve a Prisma Studio y crea el primero!</p>
        )}
      </div>
    </main>
  );
}