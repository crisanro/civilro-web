import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Star, HardHat,
  Target, Users, BookOpen, Award, Zap, Building2
} from "lucide-react";

const VALORES = [
  {
    icono: Building2,
    titulo: "Práctica Real",
    descripcion: "Cada curso está basado en planos y expedientes técnicos de obras que ya fueron construidas. No enseñamos vigas en el vacío.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icono: Target,
    titulo: "Criterio Técnico",
    descripcion: "Te enseñamos el 'por qué' detrás de cada cálculo, no solo a ejecutar pasos en un software.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icono: Users,
    titulo: "Comunidad Real",
    descripcion: "Sin bots, sin spam. Ingenieros reales que se ayudan mutuamente desde la universidad hasta la obra.",
    color: "bg-slate-100 text-slate-700",
  },
];

const HITOS = [
  { año: "2022", titulo: "La chispa", desc: "Cristhian publica su primer video explicando cálculo estructural con un caso real de obra. La respuesta lo sorprende." },
  { año: "2023", titulo: "La comunidad", desc: "Nace CivilRo como plataforma. Los primeros 100 ingenieros se unen en las primeras semanas." },
  { año: "2024", titulo: "La academia", desc: "Se lanza la plataforma de cursos con proyectos reales, plantillas de Excel y foro técnico exclusivo." },
  { año: "2025", titulo: "El crecimiento", desc: "Más de 500 ingenieros de 8 países aprenden con CivilRo. La brecha entre la U y la obra se sigue cerrando." },
];

const STATS = [
  { valor: "+500", label: "Ingenieros activos" },
  { valor: "8", label: "Países" },
  { valor: "12", label: "Cursos" },
  { valor: "4.9★", label: "Valoración" },
];

export default function Nosotros() {
  return (
    <main className="bg-white min-h-screen">

      {/* ══════════════════════════════════════════
          HERO — OSCURO (mismo tono que el home)
      ══════════════════════════════════════════ */}
      <section className="relative bg-slate-950 pt-36 pb-32 px-6 overflow-hidden">

        {/* Fondos decorativos */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.12),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(234,88,12,0.1),_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm font-bold mb-8">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            Nuestra historia
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-8">
            La ingeniería civil<br />
            se aprende en{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">
              la obra.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Fundé CivilRo porque la universidad nos falló. Enseñamos como nos hubiera gustado que nos enseñaran a nosotros.
          </p>
        </div>

        {/* Curva de transición */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 40C1440 40 1080 0 720 0C360 0 0 40 0 40L0 80Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS RÁPIDOS
      ══════════════════════════════════════════ */}
      <section className="py-16 px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-black text-slate-900">{s.valor}</p>
              <p className="text-sm text-slate-400 font-medium mt-1 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LA HISTORIA — STORYTELLING
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">

          <span className="text-orange-600 text-sm font-black uppercase tracking-widest">El origen</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-10 leading-tight">
            Hola, soy Cristhian Romero.
          </h2>

          <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
            <p>
              Recuerdo estar sentado en la facultad, viendo fórmulas infinitas en la pizarra y pensando:{" "}
              <strong className="text-slate-900">
                "¿Cómo se aplica esto cuando esté frente a una excavación de 5 metros?"
              </strong>
            </p>
            <p>
              La realidad es dura: muchas veces nos enseñan teoría obsoleta con profesores que nunca han pisado el barro de una construcción real. El salto de la facultad a la práctica profesional es un abismo que muchos cruzamos con miedo a equivocarnos.
            </p>
            <p>
              Yo lo crucé. Y en el camino aprendí más en los primeros seis meses de obra que en cuatro años de universidad. Eso no debería ser así.
            </p>
          </div>

          {/* Quote destacado */}
          <div className="relative my-14">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500 rounded-full" />
            <blockquote className="bg-slate-50 p-8 pl-10 rounded-r-[2rem] border border-slate-100">
              <p className="text-xl md:text-2xl font-black text-slate-900 italic leading-snug">
                "CivilRo nació para cerrar esa brecha. No somos una academia de libros — somos el puente entre la universidad y la obra real."
              </p>
              <p className="mt-4 text-sm font-bold text-orange-600 uppercase tracking-widest">
                — Ing. Cristhian Romero, Fundador
              </p>
            </blockquote>
          </div>

          <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
            <p>
              Hoy, con más de 8 años de experiencia en cálculo y diseño estructural, y habiendo trabajado en más de 30 proyectos reales, decidí que era momento de compartir lo que la universidad no te enseña.
            </p>
            <p>
              <strong className="text-slate-900">Cada curso, cada plantilla, cada artículo del blog</strong> tiene un solo objetivo: que lo que aprendas hoy, lo apliques mañana en la obra o en la oficina técnica.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PLACEHOLDER FOTO
      ══════════════════════════════════════════ */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-900 rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center gap-10 border border-slate-800">
            <div className="w-36 h-36 rounded-[1.5rem] bg-slate-800 border-2 border-slate-700 flex items-center justify-center shrink-0">
              <HardHat className="w-14 h-14 text-orange-500" />
            </div>
            <div>
              <p className="text-white font-black text-2xl mb-1">Ing. Cristhian Romero García</p>
              <p className="text-orange-400 text-sm font-bold uppercase tracking-widest mb-4">
                Ingeniero Civil · Especialista en Estructuras · Fundador de CivilRo
              </p>
              <div className="flex flex-wrap gap-3">
                {["Cálculo Estructural", "ETABS / SAP2000", "Diseño en Hormigón", "Metrados"].map(tag => (
                  <span key={tag} className="bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1 rounded-lg text-xs font-bold">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-slate-600 text-xs italic font-medium mt-5">📸 Foto profesional próximamente</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LÍNEA DE TIEMPO
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 text-sm font-black uppercase tracking-widest">Cronología</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">
              Cómo llegamos hasta aquí
            </h2>
          </div>

          <div className="relative">
            {/* Línea vertical */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200" />

            <div className="space-y-12">
              {HITOS.map((hito, i) => (
                <div key={hito.año} className="flex gap-8 items-start">
                  {/* Nodo */}
                  <div className="relative shrink-0">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-sm border-2 z-10 relative ${
                      i === HITOS.length - 1
                        ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-200"
                        : "bg-white border-slate-200 text-slate-500"
                    }`}>
                      {hito.año}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="pb-4 flex-1">
                    <h3 className="text-xl font-black text-slate-900 mb-2">{hito.titulo}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">{hito.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VALORES
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-600 text-sm font-black uppercase tracking-widest">Nuestra filosofía</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">
              Lo que nos define
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {VALORES.map((v) => (
              <div key={v.titulo} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-2xl ${v.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <v.icono className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{v.titulo}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{v.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA FINAL — igual que el home
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-slate-950 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(234,88,12,0.15),_transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-orange-500 text-sm font-black uppercase tracking-widest mb-4">¿Listo para empezar?</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
            Da el primer paso<br />hoy mismo.
          </h2>
          <p className="text-slate-400 text-lg font-medium mb-10 max-w-xl mx-auto leading-relaxed">
            Explora los cursos gratuitos o únete a la comunidad por $1. Sin compromisos, sin excusas.
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
              Comunidad · $1
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}