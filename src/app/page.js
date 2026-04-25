import Link from "next/link";
import { prisma } from "@/lib/db";
import {
  ArrowRight, CheckCircle2, BookOpen, Star, PlayCircle,
  Users, Award, Zap, HardHat, MonitorPlay, ChevronRight,
  Lock, Building2, GraduationCap, Briefcase, Calculator,
  FileText, Video
} from "lucide-react";
import CourseCard from "@/components/CourseCard";

const STATS = [
  { valor: "+500", label: "Ingenieros activos" },
  { valor: "12", label: "Cursos disponibles" },
  { valor: "8", label: "Países de habla hispana" },
  { valor: "4.9★", label: "Valoración media" },
];

const PERFILES = [
  {
    icono: GraduationCap,
    titulo: "Estudiante",
    descripcion: "Entiende lo que la universidad no te explica con claridad. Estática, Resistencia, ETABS — con ejemplos reales.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icono: Briefcase,
    titulo: "Recién egresado",
    descripcion: "Cierra la brecha entre el título y la obra. Aprende a leer planos, calcular y diseñar con criterio profesional.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    icono: HardHat,
    titulo: "Profesional",
    descripcion: "Especialízate en hormigón, acero o galpones. Descarga plantillas de Excel que ya usamos en proyectos reales.",
    color: "bg-slate-100 text-slate-700",
  },
];

const TESTIMONIOS = [
  { nombre: "Carlos M.", cargo: "Asistente de Obra · Lima, Perú", texto: "En 3 meses con CivilRo logré lo que no pude en años de cursos en YouTube. Ahora entiendo la conexión entre los planos y la ejecución." },
  { nombre: "Daniela V.", cargo: "Egresada UNI · Arequipa, Perú", texto: "El plan Universidad me salvó. Salí sin saber usar ETABS para edificios reales. Fue la mejor inversión para conseguir mi primer trabajo." },
  { nombre: "Miguel A.", cargo: "Residente de Obra · Bogotá, Colombia", texto: "El Plan PRO vale cada centavo. Las plantillas de Excel me ahorran horas de cálculo estructural todas las semanas." },
];

const PLANES = [
  {
    nombre: "Comunidad",
    precio: "$1",
    periodo: "pago único",
    descripcion: "Entra, explora y decide sin riesgo.",
    color: "bg-slate-800 border-slate-700",
    btnColor: "bg-slate-700 hover:bg-slate-600",
    checkColor: "text-slate-500",
    textColor: "text-slate-300",
    plan: "COMUNIDAD",
    items: ["Acceso al foro de la comunidad", "Cursos nivel Gratis", "Perfil de estudiante"],
  },
  {
    nombre: "Plan Universidad",
    precio: "$79",
    periodo: "año",
    descripcion: "Para dominar las bases antes de salir al campo.",
    color: "bg-white text-slate-900 shadow-2xl",
    btnColor: "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30",
    checkColor: "text-blue-600",
    textColor: "text-slate-700",
    badge: "Ideal Estudiantes",
    badgeColor: "bg-blue-600",
    plan: "UNIVERSIDAD",
    destacado: true,
    items: ["Todo lo de Comunidad", "Cursos Básico e Intermedio", "Certificados de finalización", "Foro técnico exclusivo"],
  },
  {
    nombre: "Plan PRO",
    precio: "$197",
    periodo: "año",
    descripcion: "Para ingenieros que calculan, diseñan y firman.",
    color: "bg-slate-800 border-2 border-orange-500",
    btnColor: "bg-orange-600 hover:bg-orange-500",
    checkColor: "text-orange-500",
    textColor: "text-slate-200",
    badge: "Profesionales",
    badgeColor: "bg-orange-500",
    plan: "PRO",
    items: ["Todo lo de Universidad", "Cursos de Especialización", "Plantillas Excel descargables", "Soporte prioritario del Ing. Cristhian"],
  },
];

export default async function Home() {
  const cursosDestacados = await prisma.curso.findMany({
    where: { publicado: true },
    take: 3,
    include: { categoria: true }
  });

  const ultimosPosts = await prisma.post.findMany({
    where: { publicado: true },
    orderBy: { fecha: 'desc' },
    take: 3
  });

  return (
    <main className="bg-white min-h-screen">

      {/* ══════════════════════════════════════════
          HERO — OSCURO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-slate-950 flex items-center overflow-hidden">

        {/* Fondo decorativo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(234,88,12,0.1),_transparent_60%)]" />

        {/* Grid decorativo */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="max-w-4xl">

            {/* Etiqueta */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm font-bold mb-8">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              La academia de ingeniería civil en español
            </div>

            {/* H1 */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-8">
              Del aula<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">
                a la obra real.
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed mb-12 max-w-2xl">
              Cursos prácticos de ingeniería estructural basados en proyectos reales.
              Empieza gratis hoy — sin tarjeta, sin compromisos.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link
                href="/cursos"
                className="inline-flex items-center justify-center gap-3 bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-orange-500 hover:-translate-y-1 transition-all shadow-2xl shadow-orange-600/30"
              >
                Explorar cursos gratis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/checkout?plan=COMUNIDAD"
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                <Lock className="w-4 h-4 text-slate-400" />
                Unirme a la comunidad · $1
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-12">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-black text-white">{s.valor}</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Placeholder visual derecho — reemplazar con imagen/video */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden xl:flex items-center justify-center opacity-20">
          <Building2 className="w-96 h-96 text-blue-400" />
        </div>

        {/* Curva de transición al blanco */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 40C1440 40 1080 0 720 0C360 0 0 40 0 40L0 80Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PARA QUIÉN ES — 3 PERFILES
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
              ¿En qué etapa estás?
            </h2>
            <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto">
              CivilRo tiene un camino para cada momento de tu carrera.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PERFILES.map((p) => (
              <div key={p.titulo} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-2xl ${p.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <p.icono className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{p.titulo}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{p.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CURSOS DESTACADOS
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-orange-600 text-sm font-black uppercase tracking-widest">Empieza hoy</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
                Cursos que puedes ver ahora mismo
              </h2>
              <p className="text-slate-500 font-medium mt-2">Sin registro obligatorio para los módulos introductorios.</p>
            </div>
            <Link href="/cursos" className="font-bold text-orange-600 hover:text-orange-700 flex items-center gap-2 shrink-0">
              Ver todos <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {cursosDestacados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cursosDestacados.map((curso) => (
                <CourseCard
                  key={curso.id}
                  title={curso.titulo}
                  category={curso.categoria?.nombre || "General"}
                  level={curso.nivel}
                  slug={curso.slug}
                  isPurchased={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border-2 border-dashed border-slate-200 rounded-3xl">
              <p className="text-slate-400 font-medium">Cargando cursos...</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          POR QUÉ CIVILRO — SIN FOTO AÚN
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Lado izquierdo: quote + features */}
          <div>
            <span className="text-orange-600 text-sm font-black uppercase tracking-widest">Nuestra filosofía</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-6 leading-tight">
              La universidad te da el título.<br />
              <span className="text-blue-700">Nosotros, la experiencia.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-10">
              Cada curso de CivilRo está basado en planos reales y expedientes técnicos de obras que ya fueron construidas. No enseñamos vigas en el vacío.
            </p>

            <ul className="space-y-6">
              {[
                { icono: FileText, color: "bg-orange-100 text-orange-600", titulo: "Plantillas de nivel profesional", desc: "Las mismas hojas de Excel que usamos en nuestra consultora día a día." },
                { icono: Video, color: "bg-blue-100 text-blue-600", titulo: "Clases en video + texto", desc: "Aprende a tu ritmo con contenido en dos formatos complementarios." },
                { icono: Calculator, color: "bg-slate-100 text-slate-700", titulo: "Calculadoras interactivas", desc: "Herramientas integradas en las lecciones para practicar mientras aprendes." },
                { icono: Award, color: "bg-green-100 text-green-700", titulo: "Certificados válidos", desc: "Respalda tu conocimiento técnico en entrevistas y licitaciones." },
              ].map((item) => (
                <li key={item.titulo} className="flex gap-4 group">
                  <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <item.icono className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">{item.titulo}</h4>
                    <p className="text-slate-500 text-sm mt-1 font-medium">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Lado derecho: placeholder hasta tener foto */}
          <div className="relative">
            <div className="bg-slate-900 rounded-[2.5rem] aspect-[4/5] flex flex-col items-center justify-center p-12 text-center border border-slate-800">
              <HardHat className="w-16 h-16 text-orange-500 mb-6" />
              <p className="text-white font-black text-2xl mb-3">Ing. Cristhian Romero</p>
              <p className="text-slate-400 font-medium leading-relaxed">
                Ingeniero Civil · Especialista en Estructuras · Fundador de CivilRo
              </p>
              <div className="mt-8 pt-8 border-t border-slate-800 w-full grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-black text-white">+8</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Años de experiencia</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-white">+30</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Proyectos reales</p>
                </div>
              </div>
              <p className="mt-8 text-slate-500 text-xs italic font-medium">
                📸 Foto profesional próximamente
              </p>
            </div>

            {/* Tarjeta flotante */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-2xl border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="font-black text-slate-900 text-sm leading-tight">Aprende haciendo</p>
                <p className="text-slate-500 text-xs font-medium mt-0.5">Proyectos 100% reales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIOS
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
              Ingenieros que ya subieron de nivel
            </h2>
            <p className="text-slate-500 font-medium">Lo que dice nuestra comunidad.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIOS.map((t, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-xl transition-shadow">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-orange-500" fill="currentColor" />
                  ))}
                </div>
                <p className="text-slate-700 italic leading-relaxed mb-6">"{t.texto}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm">
                    {t.nombre[0]}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm">{t.nombre}</p>
                    <p className="text-xs text-slate-400 font-medium">{t.cargo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PLANES
      ══════════════════════════════════════════ */}
      <section id="planes" className="py-24 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-sm font-black uppercase tracking-widest">Precios</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-4">
              Elige tu plan
            </h2>
            <p className="text-slate-400 font-medium text-lg max-w-xl mx-auto">
              Empieza gratis. Escala cuando estés listo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {PLANES.map((plan) => (
              <div
                key={plan.nombre}
                className={`rounded-3xl p-8 border flex flex-col relative ${plan.color} ${plan.destacado ? 'md:-translate-y-4' : ''}`}
              >
                {plan.badge && (
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${plan.badgeColor} text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest`}>
                    {plan.badge}
                  </div>
                )}
                <h3 className={`text-lg font-black mb-2 ${plan.destacado ? 'text-blue-700' : plan.nombre === 'Plan PRO' ? 'text-orange-400' : 'text-slate-300'}`}>
                  {plan.nombre}
                </h3>
                <div className="mb-2">
                  <span className={`text-4xl font-black ${plan.destacado ? 'text-slate-900' : 'text-white'}`}>{plan.precio}</span>
                  <span className="text-slate-400 text-sm"> /{plan.periodo}</span>
                </div>
                <p className={`text-sm mb-7 ${plan.textColor}`}>{plan.descripcion}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.items.map((item) => (
                    <li key={item} className={`flex gap-3 text-sm ${plan.textColor}`}>
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.checkColor}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/checkout?plan=${plan.plan}`}
                  className={`w-full py-4 rounded-xl font-black text-center text-white transition-all hover:-translate-y-0.5 ${plan.btnColor}`}
                >
                  {plan.nombre === 'Comunidad' ? 'Entrar por $1' : `Elegir ${plan.nombre}`}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BLOG
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-blue-600 text-sm font-black uppercase tracking-widest">Bitácora</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
                El Blog del Ingeniero
              </h2>
              <p className="text-slate-500 font-medium mt-2">Artículos técnicos, normativas y recursos para tu día a día.</p>
            </div>
            <Link href="/blog" className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2 shrink-0">
              Ver todos <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {ultimosPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ultimosPosts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.id} className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="h-52 bg-slate-100 relative overflow-hidden">
                    {post.imagenUrl ? (
                      <img src={post.imagenUrl} alt={post.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-50">
                        <BookOpen className="w-10 h-10 text-slate-200" />
                      </div>
                    )}
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-3">
                      {new Date(post.fecha).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                      {post.titulo}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1 font-medium leading-relaxed">
                      {post.resumen}
                    </p>
                    <div className="flex items-center gap-2 text-orange-600 font-black text-xs uppercase tracking-widest">
                      Leer artículo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-100">
              <p className="text-slate-400 font-medium">Los primeros artículos están en camino...</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-slate-950 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(234,88,12,0.15),_transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-orange-500 text-sm font-black uppercase tracking-widest mb-4">¿Listo para empezar?</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
            Tu carrera<br />cambia hoy.
          </h2>
          <p className="text-slate-400 text-lg font-medium mb-10 max-w-xl mx-auto leading-relaxed">
            Únete a más de 500 ingenieros que ya están aprendiendo con proyectos reales. Empieza por $1, sin compromisos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cursos"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-lg hover:-translate-y-1 transition-all shadow-2xl"
            >
              Ver cursos gratis <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/checkout?plan=COMUNIDAD"
              className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-orange-500 hover:-translate-y-1 transition-all shadow-2xl shadow-orange-600/30"
            >
              <Lock className="w-4 h-4" /> Comunidad · $1
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}