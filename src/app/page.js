import Link from "next/link";
import { prisma } from "@/lib/db";
import {
  ArrowRight, CheckCircle2, BookOpen, Star, PlayCircle,
  Users, Award, Zap, HardHat, MonitorPlay, ChevronRight, Lock
} from "lucide-react";
import CourseCard from "@/components/CourseCard";

// ─── DATA ESTÁTICA PARA LA HOME ───
const TESTIMONIOS = [
  { nombre: "Carlos M.", cargo: "Asistente de Obra", texto: "En 3 meses con CivilRo logré lo que no pude en años de cursos en YouTube. Ahora entiendo la conexión entre los planos y la ejecución.", ciudad: "Lima, Perú" },
  { nombre: "Daniela V.", cargo: "Egresada UNI", texto: "El plan Universidad me salvó. Salí sin saber usar ETABS para edificios reales. Fue la mejor inversión para conseguir mi primer trabajo.", ciudad: "Arequipa, Perú" },
  { nombre: "Miguel A.", cargo: "Residente de Obra", texto: "El Plan PRO vale cada centavo. Las plantillas de Excel me ahorran horas de cálculo estructural todas las semanas.", ciudad: "Bogotá, Colombia" },
];

export default async function Home() {
  // 1. Extraemos cursos reales de tu BD
  const cursosDestacados = await prisma.curso.findMany({
    where: { publicado: true },
    take: 3,
    include: { categoria: true }
  });

  // 2. Extraemos los posts reales de tu BD
  const ultimosPosts = await prisma.post.findMany({
    where: { publicado: true },
    orderBy: { fecha: 'desc' },
    take: 3
  });

  return (
    <main className="bg-white min-h-screen">
      
      {/* ── HERO SECTION CON VIDEO ── */}
      {/* Usamos pt-32 para que el contenido no quede debajo de tu Navbar fixed (h-20) */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden">
        {/* Fondo decorativo (Blob) */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Textos del Hero */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 font-bold text-sm mb-6 shadow-sm">
              <Star className="w-4 h-4 fill-orange-600" />
              La Academia para la Obra Real
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              De la Universidad <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-600">a la Práctica Real.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
              Domina el diseño estructural, lectura de planos y metrados con proyectos <strong className="text-slate-900">100% reales</strong>. Únete a la comunidad de ingenieros de mayor crecimiento.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/checkout?plan=COMUNIDAD" 
                className="flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-orange-700 hover:-translate-y-1 transition-all shadow-xl shadow-orange-600/20"
              >
                <Lock className="w-5 h-5" /> Regístrate por $1
              </Link>
              <Link 
                href="#planes" 
                className="flex items-center justify-center gap-2 bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:border-blue-600 hover:text-blue-700 transition-all"
              >
                Ver Planes Anuales
              </Link>
            </div>
            <p className="mt-4 text-sm font-medium text-slate-400">
              *El registro de $1 te da acceso a la comunidad y cursos gratuitos.
            </p>
          </div>

          {/* Video o Imagen a la derecha */}
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-video lg:aspect-square bg-slate-100">
            {/* TAREA: Agrega tu video en public/videos/hero.mp4 */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            >
              {/* <source src="/videos/hero.mp4" type="video/mp4" /> */}
            </video>
            
            {/* Placeholder por si no hay video aún */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-800">
              <PlayCircle className="w-16 h-16 mb-2 text-orange-500 opacity-80" />
              <p className="font-medium text-sm">Espacio para Video de CivilRo</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CINTA DE SOFTWARE ── */}
      <section className="border-y border-slate-100 bg-subtle py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Herramientas que dominarás</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 font-black text-xl md:text-2xl text-slate-800">
            <span>AutoCAD</span>
            <span className="text-blue-600">Revit</span>
            <span className="text-orange-600">ETABS</span>
            <span className="text-red-600">SAP2000</span>
            <span className="text-green-600">Excel</span>
          </div>
        </div>
      </section>

      {/* ── METODOLOGÍA (POR QUÉ SOMOS MEJORES) ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-slate-200">
            {/* TAREA: Agrega una foto tuya trabajando (ej: public/images/obra.jpg) */}
            {/* <img src="/images/obra.jpg" alt="Ing. Cristhian en obra" className="w-full h-full object-cover" /> */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-100">
              <HardHat className="w-12 h-12 mb-2 text-blue-600" />
              <p className="font-bold">Foto del Ing. Cristhian en Obra</p>
            </div>
            
            {/* Tarjeta flotante estilo moderno */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-lg flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black text-slate-900 leading-tight">Aprende haciendo</p>
                <p className="text-sm font-medium text-slate-500">Casos 100% reales de campo</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
              La universidad te da el título. <br/>
              <span className="text-blue-700">Nosotros la experiencia.</span>
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              No diseñamos vigas en el aire. Cada curso de CivilRo está basado en planos arquitectónicos y expedientes técnicos de obras que ya fueron construidas.
            </p>
            
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                  <MonitorPlay className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Plantillas de nivel profesional</h4>
                  <p className="text-slate-600 text-sm mt-1">Descarga las mismas hojas de Excel y modelos que usamos en nuestra consultora día a día.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Certificación Válida</h4>
                  <p className="text-slate-600 text-sm mt-1">Obtén certificados únicos que respaldan tu conocimiento técnico en entrevistas y licitaciones.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── LOS PLANES DE SUSCRIPCIÓN (LA VENTA CLARA) ── */}
      <section id="planes" className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Elige tu Ruta de Aprendizaje</h2>
            <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">
              Invierte en tu futuro. Paga una vez al año y domina las herramientas que te conseguirán tu próximo ascenso o proyecto.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* 1. PLAN COMUNIDAD ($1) */}
            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 flex flex-col">
              <h3 className="text-xl font-bold text-slate-300 mb-2">Comunidad</h3>
              <div className="mb-6">
                <span className="text-4xl font-black">$1</span>
                <span className="text-slate-400 text-sm"> /pago único</span>
              </div>
              <p className="text-slate-400 text-sm mb-8 h-10">El filtro perfecto. Acceso básico para conocer la plataforma.</p>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0"/> Acceso al foro de la comunidad</li>
                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0"/> Cursos nivel "Gratis"</li>
                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0"/> Perfil de estudiante</li>
              </ul>
              <Link href="/checkout?plan=COMUNIDAD" className="w-full py-3 rounded-xl font-bold text-center bg-slate-700 text-white hover:bg-slate-600 transition-colors">
                Unirme por $1
              </Link>
            </div>

            {/* 2. PLAN UNIVERSIDAD ($79) */}
            <div className="bg-white text-slate-900 rounded-3xl p-8 shadow-xl flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                Ideal Estudiantes
              </div>
              <h3 className="text-xl font-bold text-blue-700 mb-2">Plan Universidad</h3>
              <div className="mb-6">
                <span className="text-5xl font-black">$79</span>
                <span className="text-slate-500 font-medium"> /año</span>
              </div>
              <p className="text-slate-600 text-sm mb-8 h-10">Perfecto para asentar las bases antes de salir al campo laboral.</p>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex gap-3 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0"/> Todo lo de Comunidad</li>
                <li className="flex gap-3 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0"/> Cursos de nivel Básico e Intermedio</li>
                <li className="flex gap-3 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0"/> Certificados de finalización</li>
              </ul>
              <Link href="/checkout?plan=UNIVERSIDAD" className="w-full py-4 rounded-xl font-black text-center bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1">
                Elegir Universidad
              </Link>
            </div>

            {/* 3. PLAN PRO ($197) */}
            <div className="bg-slate-800 border-2 border-orange-500 rounded-3xl p-8 flex flex-col relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                Profesionales
              </div>
              <h3 className="text-xl font-bold text-orange-400 mb-2">Plan PRO</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-white">$197</span>
                <span className="text-slate-400 font-medium text-sm"> /año</span>
              </div>
              <p className="text-slate-400 text-sm mb-8 h-10">Para ingenieros que calculan, diseñan y firman proyectos.</p>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex gap-3 text-sm text-slate-200"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0"/> Todo lo del Plan Universidad</li>
                <li className="flex gap-3 text-sm text-slate-200"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0"/> Cursos de Especialización Avanzada</li>
                <li className="flex gap-3 text-sm text-slate-200"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0"/> Descarga de Plantillas de Excel</li>
                <li className="flex gap-3 text-sm text-slate-200"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0"/> Soporte prioritario del Ing. Cristhian</li>
              </ul>
              <Link href="/checkout?plan=PRO" className="w-full py-3 rounded-xl font-bold text-center bg-orange-600 text-white hover:bg-orange-500 transition-colors">
                Elegir Plan PRO
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── CURSOS DESTACADOS (PRISMA) ── */}
      <section className="py-24 px-6 bg-subtle border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Un vistazo a la Academia</h2>
              <p className="text-slate-500 font-medium">Cursos prácticos que puedes empezar a ver hoy mismo.</p>
            </div>
            <Link href="/cursos" className="font-bold text-orange-600 hover:text-orange-700 flex items-center gap-2">
              Ver todos los cursos <ChevronRight className="w-5 h-5" />
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
              <p className="text-slate-400 font-medium">Cargando los mejores cursos de ingeniería...</p>
            </div>
          )}
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Ingenieros que ya subieron de nivel</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIOS.map((t, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, si) => <Star key={si} className="w-4 h-4 text-orange-500" fill="currentColor" />)}
                </div>
                <p className="text-slate-700 italic mb-6">"{t.texto}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    {t.nombre[0]}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{t.nombre}</div>
                    <div className="text-xs text-slate-500 font-medium">{t.cargo}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG DINÁMICO (PRISMA) ── */}
      <section className="py-24 px-6 bg-subtle border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">El Blog del Ingeniero</h2>
              <p className="text-slate-500 font-medium">Consejos de obra, análisis estructural y recursos gratuitos.</p>
            </div>
            <Link href="/blog" className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2">
              Leer artículos <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {ultimosPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ultimosPosts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="h-48 bg-slate-200 relative overflow-hidden">
                    {post.imagenUrl ? (
                      <img src={post.imagenUrl} alt={post.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-50">
                        <BookOpen className="w-10 h-10 text-blue-200 group-hover:text-blue-400 transition-colors" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs font-bold text-blue-600 mb-3 uppercase tracking-wider">
                      {new Date(post.fecha).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {post.titulo}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1">
                      {post.resumen}
                    </p>
                    <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
                      Leer más <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
              <p className="text-slate-500 font-medium">Los primeros artículos están en proceso de redacción...</p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-blue-50 rounded-[3rem] p-12 md:p-16 border border-blue-100 shadow-xl shadow-blue-900/5 relative overflow-hidden">
          {/* Adornos SVG de fondo */}
          <Zap className="absolute top-8 right-8 w-32 h-32 text-blue-100 opacity-50 -rotate-12" />
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 relative z-10">
            Tu carrera cambia hoy.
          </h2>
          <p className="text-lg text-slate-600 mb-10 relative z-10">
            Da el primer paso. Únete a la comunidad por solo $1 y descubre por qué somos la academia de mayor crecimiento para ingenieros.
          </p>
          <div className="relative z-10">
            <Link 
              href="/checkout?plan=COMUNIDAD" 
              className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-orange-700 hover:-translate-y-1 transition-all shadow-xl shadow-orange-600/30"
            >
              <Lock className="w-5 h-5" /> Entrar a la Comunidad por $1
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}