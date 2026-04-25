import Link from "next/link";

export default function Nosotros() {
  return (
    <main className="bg-white min-h-screen">
      {/* SECCIÓN HERO - La Declaración de Guerra */}
      <section className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8">
          La ingeniería civil se aprende en <span className="text-orange-600">la obra.</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
          Fundé CivilRo porque la universidad nos falló. Enseñamos como nos hubiera gustado que nos enseñaran a nosotros.
        </p>
      </section>

      {/* SECCIÓN LA HISTORIA - Storytelling de Cristhian */}
      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="prose prose-slate lg:prose-xl max-w-none">
          <p className="text-2xl font-bold text-slate-900 mb-6">Hola, soy Cristhian Romero.</p>
          
          <p>
            Recuerdo estar sentado en la facultad, viendo fórmulas infinitas en la pizarra y pensando: 
            <strong> "¿Cómo se aplica esto cuando esté frente a una excavación de 5 metros?"</strong>.
          </p>

          <p>
            La realidad es dura: en la universidad muchas veces nos enseñan teoría obsoleta o profesores que nunca han pisado el barro de una construcción real. El salto de la facultad a la práctica profesional es un abismo que muchos cruzamos con miedo a equivocarnos.
          </p>

          <blockquote className="border-l-4 border-orange-500 pl-6 my-10 italic text-slate-800 bg-slate-50 py-6 pr-6 rounded-r-2xl">
            "CivilRo nació para cerrar esa brecha. No somos una academia de libros, somos el apoyo real para el estudiante y el recién egresado."
          </blockquote>

          <h2 className="text-3xl font-black text-slate-900 mt-12">Nuestra Misión</h2>
          <p>
            Queremos que dejes de ser un espectador y te conviertas en un profesional con criterio técnico. En CivilRo, cada curso y cada post del blog tiene un solo objetivo: <strong>que lo que aprendas hoy, lo apliques mañana en la obra o en la oficina técnica.</strong>
          </p>
        </div>
      </section>

      {/* SECCIÓN DE VALORES - Por qué nosotros */}
      <section className="bg-slate-900 py-24 px-6 text-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-4xl mb-4">🏗️</div>
            <h3 className="text-xl font-bold mb-2">Práctica Real</h3>
            <p className="text-slate-400">Casos reales de obra, no ejercicios de pizarra.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold mb-2">Criterio Técnico</h3>
            <p className="text-slate-400">Te enseñamos el "por qué" de las cosas, no solo a usar un software.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-2">Comunidad</h3>
            <p className="text-slate-400">Acompañamiento directo de la U a tus primeras prácticas.</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION - Hacia Stripe */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8">
          ¿Listo para dar el salto profesional?
        </h2>
        <p className="text-xl text-slate-500 mb-10">
          Únete a la escuela y empieza a aprender ingeniería de verdad.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            href="/unete" 
            className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
          >
            Ver planes de membresía
          </Link>
          <Link 
            href="/blog" 
            className="bg-slate-100 text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all"
          >
            Leer el blog gratis
          </Link>
        </div>
      </section>
    </main>
  );
}