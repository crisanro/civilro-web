import { prisma } from "@/lib/db";
import { Search, User, Mail, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AdminUsuarios({ searchParams }) {
  const { q } = await searchParams;
  
  const usuarios = await prisma.user.findMany({
    where: q ? {
      OR: [
        { email: { contains: q, mode: 'insensitive' } },
        { nombre: { contains: q, mode: 'insensitive' } }
      ]
    } : {},
    orderBy: { createdAt: 'desc' },
    take: 20
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Panel de Alumnos</h1>
          <p className="text-slate-500 font-medium">Busca, supervisa y gestiona accesos.</p>
        </div>

        {/* BUSCADOR */}
        <form className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            name="q"
            defaultValue={q}
            placeholder="Buscar por correo o nombre..."
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-all"
          />
        </form>
      </div>

      {/* RESULTADOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {usuarios.map((u) => (
          <Link 
            key={u.id} 
            href={`/admin/usuarios/${u.id}`}
            className="group bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:border-orange-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <img src={u.imagenUrl || "/avatar.png"} className="w-12 h-12 rounded-2xl object-cover" />
              <div className="overflow-hidden">
                <p className="font-black text-slate-800 truncate">{u.nombre || "Alumno Nuevo"}</p>
                <p className="text-xs text-slate-400 truncate">{u.email}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <span className="text-[10px] font-black px-3 py-1 rounded-full bg-slate-100 text-slate-500 uppercase">
                Plan {u.plan}
              </span>
              <div className="flex items-center gap-1 text-orange-600 font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Ver Expediente <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}