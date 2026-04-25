import { prisma } from "@/lib/db";
import FormularioCurso from "@/components/admin/FormularioCurso";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditarCursoPage({ params }) {
  // 1. Cambia 'id' por 'cursoId' (debe ser IGUAL al nombre de la carpeta [])
  const { cursoId } = await params; 

  const curso = await prisma.curso.findUnique({
    where: { 
      // 2. Aquí usamos 'cursoId' que es lo que recibimos arriba
      id: parseInt(cursoId) 
    }
  });

  const categorias = await prisma.categoria.findMany();

  if (!curso) notFound();

  return (
    <div className="max-w-4xl mx-auto pb-20 pt-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/cursos" className="p-2 bg-white rounded-xl border border-slate-200">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Editar Curso</h1>
          <p className="text-slate-500 font-medium italic">Modificando: {curso.titulo}</p>
        </div>
      </div>

      <FormularioCurso categorias={categorias} curso={curso} />
    </div>
  );
}