import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Lock, PlayCircle, Zap, CheckCircle2, 
  BookOpen, Award, Users, ChevronRight, Clock, Star
} from "lucide-react";
import { getSession } from "@/lib/auth";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default async function DetalleCurso({ params }) {
  const { slug } = await params;
  
  const user = await getSession();
  const userPlan = user?.plan || "FREE";
  const niveles = { "FREE": 0, "COMUNIDAD": 1, "UNIVERSIDAD": 2, "PRO": 3 };

  const curso = await prisma.curso.findUnique({
    where: { slug: slug },
    include: {
      lecciones: { orderBy: { orden: 'asc' } },
      categoria: true
    }
  });

  if (!curso) notFound();

  const nivelRequerido = curso.accesoMinimo || "COMUNIDAD";
  const tieneAcceso = niveles[userPlan] >= niveles[nivelRequerido];
  const precios = { "FREE": "0", "COMUNIDAD": "4.99", "UNIVERSIDAD": "79", "PRO": "197" };
  const primeraLeccion = curso.lecciones[0]?.id;

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      
      {/* 1. HERO SECTION (BANNER OSCURO) */}
      <section className="bg-slate-900 pt-32 pb-48 px-6 border-b-4 border-orange-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">
              <Link href="/cursos" className="hover:text-white transition-colors">Cursos</Link>
              <ChevronRight className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500">{curso.categoria.nombre}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.95] tracking-tighter">
              {curso.titulo}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-300">
              <div className="flex items-center gap-3 bg-slate-800/50 pr-4 rounded-full border border-slate-700">
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-black border-2 border-slate-900">CR</div>
                <span>Ing. Cristhian Romero</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span>+850 Inscritos</span>
              </div>
              <div className="flex items-center gap-2 text-orange-400">
                <Award className="w-5 h-5" />
                <span>Certificado Oficial</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GRID DE CONTENIDO */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* COLUMNA IZQUIERDA */}
          <div className="lg:col-span-8 -mt-24 relative z-20 space-y-8">
            
            {/* BLOQUE 1: ACERCA DEL CURSO (RESUMEN) */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-white">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-2 h-10 bg-blue-600 rounded-full" />
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Acerca de este curso</h2>
              </div>
              
              <div className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
                {curso.resumen || "Este programa ha sido diseñado para llevarte de la teoría a la práctica real en tiempo récord."}
              </div>

              <div className="flex items-center gap-4 py-4 px-6 bg-slate-50 rounded-2xl border border-slate-100 inline-flex">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Nivel del programa:</span>
                <span className="bg-slate-900 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                  {curso.nivel}
                </span>
              </div>
            </div>

            {/* BLOQUE 2: DETALLES TÉCNICOS (MARKDOWN) */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-white">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-2 h-10 bg-orange-500 rounded-full" />
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Detalles del Programa</h2>
              </div>
              
              <MarkdownRenderer content={curso.descripcion} />
            </div>

            {/* BLOQUE 3: TEMARIO */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-white">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-blue-600" /> Temario
                </h2>
                <span className="text-sm font-black text-slate-400 bg-slate-100 px-4 py-2 rounded-xl uppercase">
                  {curso.lecciones.length} Clases
                </span>
              </div>

              <div className="space-y-4">
                {curso.lecciones.map((lec) => {
                  const isFreePreview = lec.orden === 1;
                  const canWatch = tieneAcceso || isFreePreview;

                  return (
                    <div key={lec.id} className={`group relative p-6 rounded-2xl border transition-all ${canWatch ? 'bg-white border-slate-200 hover:border-blue-500 hover:shadow-lg' : 'bg-slate-50 border-slate-100 opacity-70'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                          <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${canWatch ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : 'bg-slate-200 text-slate-400'}`}>
                            {lec.orden}
                          </span>
                          <div>
                            <h4 className={`font-bold transition-colors ${canWatch ? 'text-slate-800 group-hover:text-blue-600' : 'text-slate-400'}`}>
                              {lec.titulo}
                            </h4>
                            {isFreePreview && !tieneAcceso && (
                              <span className="text-[9px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-black uppercase tracking-widest mt-1 inline-block border border-green-200">Clase Abierta</span>
                            )}
                          </div>
                        </div>
                        {canWatch ? (
                          <Link href={`/cursos/${slug}/${lec.id}`} className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors">
                            <PlayCircle className="w-5 h-5" />
                          </Link>
                        ) : (
                          <Lock className="w-5 h-5 text-slate-300" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: SIDEBAR DE COMPRA */}
          <div className="lg:col-span-4 relative z-30">
            <div className="sticky top-28 lg:-mt-64 bg-white rounded-[3rem] shadow-2xl shadow-slate-400/20 border-8 border-white overflow-hidden">
              <div className="relative aspect-video group cursor-pointer">
                <img src={curso.imagenUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center group-hover:bg-slate-900/60 transition-colors">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-10 h-10 text-white fill-white/20" />
                  </div>
                  <span className="text-white font-black uppercase tracking-widest text-[10px] mt-4">Trailer del curso</span>
                </div>
              </div>

              <div className="p-10 text-center">
                {!tieneAcceso ? (
                  <>
                    <div className="mb-8">
                      <span className="text-5xl font-black text-slate-900 tracking-tighter">${precios[nivelRequerido]}</span>
                      <p className="text-xs font-black text-orange-500 uppercase tracking-[0.3em] mt-2">Plan {nivelRequerido} de por vida</p>
                    </div>
                    <Link href={`/checkout?plan=${nivelRequerido}`} className="w-full bg-orange-600 hover:bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-orange-100 flex items-center justify-center gap-3 mb-6">
                      <Zap className="w-5 h-5" /> Inscribirme ahora
                    </Link>
                  </>
                ) : (
                  <Link href={`/cursos/${slug}/${primeraLeccion}`} className="w-full bg-blue-600 hover:bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 mb-6">
                    <PlayCircle className="w-5 h-5" /> Ir al aula virtual
                  </Link>
                )}

                <ul className="text-left space-y-4">
                  {['Acceso ilimitado', 'Material descargable', 'Foro de consultas', 'Certificado técnico'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-500 uppercase tracking-tighter">
                      <CheckCircle2 className="w-5 h-5 text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}