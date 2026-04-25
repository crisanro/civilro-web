import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BookOpen, Award, CheckCircle, Settings, LogOut } from "lucide-react"; // Añadimos LogOut
import CourseCard from "@/components/CourseCard"; 

export default async function Dashboard() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("civilro_session");

  if (!sessionCookie) redirect("/login");
  const { email } = JSON.parse(sessionCookie.value);

  // 2. Obtener Usuario con sus Progresos y Certificados
  const user = await prisma.user.findUnique({
    where: { email: email },
    // Si aún no has agregado estas tablas al schema, coméntalas temporalmente
    /*
    include: {
      progresos: true,
      certificados: true
    }
    */
  });

  if (!user) redirect("/login?error=user_not_found");

  const userProgresos = user.progresos || []; 
  const userCertificados = user.certificados || [];

  // 3. Cursos según el plan del usuario
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

  // 4. Calcular Métricas Reales
  const stats = {
    cursosIniciados: cursosDisponibles.filter(curso => 
      curso.lecciones.some(l => userProgresos.find(p => p.leccionId === l.id))
    ).length,
    leccionesTerminadas: userProgresos.length,
    certificados: userCertificados.length
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER Y ACCIONES DE LA CUENTA */}
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
            
            {/* LÓGICA COMERCIAL: Gestionar (Stripe) vs Mejorar Plan */}
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

            {/* BOTÓN DE CERRAR SESIÓN (Sin usar JavaScript del lado del cliente) */}
            <form action="/api/auth/logout" method="POST">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </form>
          </div>
        </header>

        {/* TARJETAS DE MÉTRICAS (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">{stats.cursosIniciados}</p>
              <p className="text-sm font-medium text-slate-500">Cursos Activos</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">{stats.leccionesTerminadas}</p>
              <p className="text-sm font-medium text-slate-500">Lecciones Completadas</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">{stats.certificados}</p>
              <p className="text-sm font-medium text-slate-500">Certificados Obtenidos</p>
            </div>
          </div>
        </div>
        
        {/* LISTA DE CURSOS CON PROGRESO */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Tu Ruta de Aprendizaje</h2>
          
          {cursosDisponibles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cursosDisponibles.map((curso) => {
                const totalLecciones = curso.lecciones.length;
                const leccionesTerminadas = curso.lecciones.filter(l => 
                  userProgresos.some(p => p.leccionId === l.id)
                ).length;
                
                const progreso = totalLecciones === 0 ? 0 : Math.round((leccionesTerminadas / totalLecciones) * 100);

                return (
                  <div key={curso.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
                    {progreso === 100 && (
                      <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Award className="w-3 h-3" /> Terminado
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2 block">
                        {curso.categoria?.nombre || "General"}
                      </span>
                      <h3 className="font-bold text-slate-900 text-lg mb-2 pr-10 leading-tight">{curso.titulo}</h3>
                      <p className="text-sm text-slate-500 mb-6">{leccionesTerminadas} de {totalLecciones} lecciones</p>
                    </div>
                    
                    <div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 mb-4 overflow-hidden">
                        <div 
                          className={`h-2.5 rounded-full transition-all duration-1000 ${progreso === 100 ? 'bg-green-500' : 'bg-orange-500'}`} 
                          style={{ width: `${progreso}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700">{progreso}%</span>
                        <a href={`/cursos/${curso.slug}`} className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors">
                          {progreso === 100 ? 'Repasar' : 'Continuar'}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400">No hay cursos disponibles para tu plan actual.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}