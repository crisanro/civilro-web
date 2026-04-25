import { prisma } from "@/lib/db";
import FormularioCurso from "@/components/admin/FormularioCurso"; 
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NuevoCurso() {
  // 1. Buscamos las categorías en la base de datos (Acción de servidor)
  const categorias = await prisma.categoria.findMany();

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Botón de volver */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/cursos" className="p-2 bg-white rounded-xl border border-slate-200">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Crear Nuevo Curso</h1>
          <p className="text-slate-500 font-medium">Define los parámetros de tu nueva Masterclass.</p>
        </div>
      </div>

      {/* 2. Llamamos al componente que tiene los botones y el editor */}
      <FormularioCurso categorias={categorias} />
    </div>
  );
}