import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BookOpen, Award, CheckCircle, Settings, LogOut } from "lucide-react";
import FormularioPerfil from "@/components/dashboard/FormularioPerfil";
import FcmHandler from "@/components/dashboard/FcmHandler"; // <--- IMPORTAMOS EL HANDLER

export default async function Dashboard() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("civilro_session");

  if (!sessionCookie) redirect("/login");
  const { email } = JSON.parse(sessionCookie.value);

  // 1. Obtener Usuario con datos reales (YA DESCOMENTADO)
  const user = await prisma.user.findUnique({
    where: { email: email },
    include: {
      progresos: true,
      certificados: true
    }
  });

  if (!user) redirect("/login?error=user_not_found");

  const userProgresos = user.progresos || []; 
  const userCertificados = user.certificados || [];

  // 2. Cursos disponibles (Lógica de planes)
  const cursosDisponibles = await prisma.curso.findMany({
    where: {
      publicado: true,
      OR: [
        { accesoMinimo: 'FREE' },
        { accesoMinimo: user.plan === 'PRO' ? 'PRO' : 'UNIVERSIDAD' },
        ...(user.plan === 'PRO' ? [{ accesoMinimo: 'UNIVERSIDAD' }] : [])
      ]
    },
    include: { 
      categoria: true,
      lecciones: { select: { id: true } } 
    }
  });

  // 3. Métricas
  const stats = {
    cursosIniciados: cursosDisponibles.filter(curso => 
      curso.lecciones.some(l => userProgresos.find(p => p.leccionId === l.id))
    ).length,
    leccionesTerminadas: userProgresos.length,
    certificados: userCertificados.length
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20 px-6">
      {/* --- MAGIA DE FIREBASE --- */}
      <FcmHandler userEmail={user.email} /> 
      
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Panel de <span className="text-orange-600">Aprendizaje</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Ingeniero: <span className="text-slate-900 capitalize">{user.nombre || user.email.split('@')[0]}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className={`px-4 py-2 rounded-xl text-sm font-bold ${user.plan === 'PRO' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              Plan {user.plan}
            </div>
            
            {user.stripeCustomerId ? (
              <form action="/api/stripe/portal" method="POST">
                <input type="hidden" name="email" value={user.email} />
                <button className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
                  <Settings className="w-4 h-4" />
                  Gestionar Suscripción
                </button>
              </form>
            ) : (
              <a href="/precios" className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white bg-orange-600 hover:bg-slate-900 transition-colors">
                <Award className="w-4 h-4" />
                Mejorar Plan
              </a>
            )}

            <form action="/api/auth/logout" method="POST">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </form>
          </div>
        </header>

        {/* CONFIGURACIÓN DE PERFIL */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4 px-2">Configuración de Perfil</h2>
          <FormularioPerfil usuario={user} />
        </section>

        {/* KPIs (TARJETAS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* ... (Aquí va tu código de métricas que ya está bien) ... */}
        </div>
        
        {/* RUTA DE APRENDIZAJE */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Tu Ruta de Aprendizaje</h2>
          {/* ... (Aquí va tu código de cursos que ya está bien) ... */}
        </section>
      </div>
    </main>
  );
}