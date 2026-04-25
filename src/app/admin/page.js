import { prisma } from "@/lib/db";
import { Users, PlaySquare, FileText, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  // Hacemos consultas rápidas a la base de datos para los KPIs (Key Performance Indicators)
  const totalUsuarios = await prisma.user.count();
  const totalCursos = await prisma.curso.count();
  const totalPosts = await prisma.post.count();
  
  // Contamos usuarios que ya no son "FREE" (Han pagado algo)
  const usuariosDePago = await prisma.user.count({
    where: { plan: { not: "FREE" } }
  });

  return (
    <div className="max-w-6xl mx-auto">
      
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Bienvenido, Ing. Romero</h1>
        <p className="text-slate-500">Aquí tienes el resumen del rendimiento de tu academia hoy.</p>
      </div>

      {/* TARJETAS DE MÉTRICAS (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Alumnos</p>
            <h3 className="text-3xl font-black text-slate-900">{totalUsuarios}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Cursos Activos</p>
            <h3 className="text-3xl font-black text-slate-900">{totalCursos}</h3>
          </div>
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
            <PlaySquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Artículos Blog</p>
            <h3 className="text-3xl font-black text-slate-900">{totalPosts}</h3>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Alumnos Premium</p>
            <h3 className="text-3xl font-black text-white">{usuariosDePago}</h3>
          </div>
          <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ACCESOS RÁPIDOS Y ACTIVIDAD RECIENTE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna Izquierda (Accesos rápidos) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">¿Qué quieres hacer hoy?</h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/admin/cursos/nuevo" className="p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group flex flex-col items-center text-center">
                <PlaySquare className="w-8 h-8 text-slate-400 group-hover:text-blue-600 mb-3 transition-colors" />
                <span className="font-bold text-slate-700 group-hover:text-blue-700">Subir nuevo curso</span>
              </Link>
              
              <Link href="/admin/blog/nuevo" className="p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-orange-500 hover:bg-orange-50 transition-all group flex flex-col items-center text-center">
                <FileText className="w-8 h-8 text-slate-400 group-hover:text-orange-600 mb-3 transition-colors" />
                <span className="font-bold text-slate-700 group-hover:text-orange-700">Escribir un artículo</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Columna Derecha (Ej: Últimos registros) */}
        <div>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 h-full">
            <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Atención Requerida</h2>
            
            <div className="space-y-4">
              {/* Aquí luego iteraremos sobre los últimos comentarios de la BD */}
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                <p className="text-xs font-bold text-orange-600 mb-1">Nuevo Comentario</p>
                <p className="text-sm text-slate-700 font-medium">"Ingeniero, tengo una duda en la clase de ETABS..."</p>
                <Link href="/admin/comentarios" className="text-xs font-bold text-blue-600 hover:underline mt-2 inline-block">Ver y responder</Link>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs font-bold text-slate-500 mb-1">Nuevo Alumno Registrado</p>
                <p className="text-sm text-slate-700 font-medium">carlos.m@ejemplo.com acaba de unirse al Plan Comunidad.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}