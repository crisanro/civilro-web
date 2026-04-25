import { prisma } from "@/lib/db";
import { GraduationCap, Trophy, Shield, UserCheck } from "lucide-react";
import { actualizarEstadoUsuario } from "@/actions/usuarios";
import Link from "next/link";

export default async function DetalleUsuario({ params }) {
  const { id } = await params;
  const userId = parseInt(id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      progresos: { include: { leccion: { include: { curso: true } } } },
      certificados: { include: { curso: true } },
    }
  });

  // Server Action para el formulario del Plan
  const cambiarPlan = async (formData) => {
    "use server";
    const nuevoPlan = formData.get("plan");
    await actualizarEstadoUsuario(userId, { plan: nuevoPlan });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* CABECERA DINÁMICA */}
      <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl flex flex-col lg:row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <img src={user.imagenUrl || "/avatar.png"} className="w-24 h-24 rounded-[2rem] border-4 border-slate-800 shadow-xl" />
          <div>
            <h1 className="text-3xl font-black tracking-tighter">{user.nombre}</h1>
            <p className="text-slate-400 font-mono text-sm">{user.email}</p>
            <div className="flex gap-2 mt-3">
               <span className="bg-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">PLAN ACTUAL: {user.plan}</span>
            </div>
          </div>
        </div>
        
        {/* CONSOLA DE CAMBIO DE STATUS */}
        <div className="bg-slate-800 p-6 rounded-[2.5rem] border border-slate-700 w-full lg:w-auto">
           <p className="text-[10px] font-black text-slate-500 uppercase mb-4 text-center tracking-widest">Gestión de Privilegios</p>
           <form action={cambiarPlan} className="flex flex-col sm:flex-row gap-3">
              <select 
                name="plan" 
                defaultValue={user.plan}
                className="bg-slate-950 text-white border border-slate-600 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="FREE">FREE (Solo Blog)</option>
                <option value="COMUNIDAD">COMUNIDAD (Acceso Base)</option>
                <option value="UNIVERSIDAD">UNIVERSIDAD (Anual)</option>
                <option value="PRO">PRO (Todo Incluido)</option>
              </select>
              <button type="submit" className="bg-orange-600 hover:bg-white hover:text-orange-600 text-white px-6 py-2 rounded-xl text-xs font-black transition-all uppercase">
                Actualizar
              </button>
           </form>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA 1: PROGRESO DETALLADO POR CURSO */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-800">
              <GraduationCap className="text-orange-500" /> Cursos en Curso
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Aquí mapearíamos los cursos donde tiene al menos 1 progreso */}
              {user.progresos.length > 0 ? (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Actividad Reciente</p>
                  <p className="font-bold text-slate-700 text-sm italic">
                    "{user.progresos[0].leccion.titulo}"
                  </p>
                  <p className="text-[10px] font-bold text-orange-600 mt-2 uppercase">
                    Curso: {user.progresos[0].leccion.curso.titulo}
                  </p>
                </div>
              ) : (
                <div className="col-span-2 py-10 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Sin actividad registrada</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* COLUMNA 2: LOGROS Y ACCIONES EXTRA */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-800">
              <Trophy className="text-yellow-500" /> Diplomas
            </h2>
            <div className="space-y-3">
              {user.certificados.map(cert => (
                <div key={cert.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                  <span className="text-xs font-bold text-yellow-800 truncate pr-2">{cert.curso.titulo}</span>
                  <Link href={cert.urlPdf || "#"} className="text-[9px] font-black bg-white px-2 py-1 rounded-lg shadow-sm">VER</Link>
                </div>
              ))}
              {user.certificados.length === 0 && <p className="text-center text-slate-300 text-xs py-4 italic">Ningún certificado emitido</p>}
            </div>
          </div>

          {/* ACCIÓN PELIGROSA / ROL */}
          <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100">
             <h3 className="text-xs font-black text-red-600 uppercase mb-4 flex items-center gap-2">
               <Shield className="w-4 h-4" /> Zona de Seguridad
             </h3>
             <button className="w-full bg-white border border-red-200 text-red-600 py-3 rounded-xl text-[10px] font-black hover:bg-red-600 hover:text-white transition-all uppercase">
               Convertir en Administrador
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}