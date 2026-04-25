"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

export default function BlogList({ posts }) {
  const [categoriaActive, setCategoriaActive] = useState("Todos");
  const categorias = ["Todos", "Ingeniería", "Software", "Construcción", "Metrados"];

  const filteredPosts = useMemo(() => {
    return categoriaActive === "Todos"
      ? posts
      : posts.filter(p => p.categoria === categoriaActive);
  }, [posts, categoriaActive]);

  const [hero, second, third, ...rest] = filteredPosts;

  return (
    <div className="max-w-7xl mx-auto px-6">

      {/* ── FILTROS ───────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 mb-14 justify-center">
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoriaActive(cat)}
            className={`px-7 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${
              categoriaActive === cat
                ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-200 scale-105"
                : "bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── SIN RESULTADOS ────────────────────────────────────── */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-32">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-2xl font-black text-slate-800">Sin artículos en esta categoría</p>
          <p className="text-slate-400 mt-2 font-medium text-sm">Pronto habrá contenido aquí</p>
        </div>
      )}

      {/* ── HERO ──────────────────────────────────────────────── */}
      {hero && (
        <section className="mb-10 group">
          <Link href={`/blog/${hero.slug}`}>
            <div className="relative h-[580px] w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              
              {/* Imagen */}
              <img
                src={hero.imagenUrl}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                alt={hero.titulo}
              />

              {/* Degradado elaborado: oscuro abajo, sutil arriba */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-900/10" />
              {/* Degradado lateral para más profundidad */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />

              {/* Badge superior */}
              <div className="absolute top-8 left-8 flex items-center gap-3">
                <span className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Último artículo
                </span>
                {hero.categoria && (
                  <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                    {hero.categoria}
                  </span>
                )}
              </div>

              {/* Contenido inferior */}
              <div className="absolute bottom-0 left-0 p-10 md:p-14 w-full md:w-3/4">
                <time className="text-orange-400 text-[11px] font-black uppercase tracking-widest mb-4 block">
                  {new Date(hero.fecha).toLocaleDateString('es-ES', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </time>

                <h2 className="text-4xl md:text-[3.5rem] font-black text-white leading-[1.05] tracking-tighter mb-5">
                  {hero.titulo}
                </h2>

                <p className="text-slate-300 text-base md:text-lg line-clamp-2 font-medium leading-relaxed mb-8 max-w-xl">
                  {hero.resumen}
                </p>

                <div className="inline-flex items-center gap-3 bg-white text-slate-900 px-7 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-xl">
                  Leer artículo
                  <span className="group-hover:translate-x-1.5 transition-transform inline-block">→</span>
                </div>
              </div>

              {/* Decoración: línea naranja inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-orange-400 to-transparent" />
            </div>
          </Link>
        </section>
      )}

      {/* ── SEGUNDO + TERCERO ─────────────────────────────────── */}
      {(second || third) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[second, third].filter(Boolean).map(post => (
            <article key={post.id} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-80 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-500">
                  
                  <img
                    src={post.imagenUrl}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={post.titulo}
                  />

                  {/* Degradado fuerte abajo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />

                  {/* Badge categoría */}
                  <div className="absolute top-5 left-5">
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest">
                      {post.categoria || "Blog"}
                    </span>
                  </div>

                  {/* Texto sobre imagen */}
                  <div className="absolute bottom-0 left-0 p-7 w-full">
                    <time className="text-orange-400 text-[10px] font-black uppercase tracking-widest block mb-2">
                      {new Date(post.fecha).toLocaleDateString('es-ES', {
                        day: 'numeric', month: 'long'
                      })}
                    </time>
                    <h3 className="text-xl font-black text-white leading-tight line-clamp-2 group-hover:text-orange-300 transition-colors">
                      {post.titulo}
                    </h3>
                    <p className="text-slate-400 text-xs mt-2 line-clamp-2 font-medium leading-relaxed">
                      {post.resumen}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/50 group-hover:text-orange-400 transition-colors">
                      Ver artículo
                      <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </div>
                  </div>

                  {/* Línea naranja inferior */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      {/* ── RESTO: lista compacta ─────────────────────────────── */}
      {rest.length > 0 && (
        <div className="border-t-2 border-slate-100 pt-10 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6">
            Más artículos
          </p>
          {rest.map((post, i) => (
            <article key={post.id} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="flex gap-5 items-center p-4 rounded-[1.5rem] hover:bg-white hover:shadow-lg border-2 border-transparent hover:border-slate-100 transition-all duration-300">
                  
                  <span className="text-[10px] font-black text-slate-200 w-5 shrink-0 text-right tabular-nums">
                    {String(i + 3).padStart(2, '0')}
                  </span>

                  <div className="w-20 h-14 rounded-2xl overflow-hidden shrink-0 shadow">
                    <img
                      src={post.imagenUrl}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={post.titulo}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest">
                        {post.categoria || "Blog"}
                      </span>
                      <span className="w-3 h-px bg-slate-200" />
                      <time className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                        {new Date(post.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                      </time>
                    </div>
                    <h3 className="text-sm font-black text-slate-800 group-hover:text-orange-600 transition-colors line-clamp-1">
                      {post.titulo}
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5 line-clamp-1 font-medium">
                      {post.resumen}
                    </p>
                  </div>

                  <span className="text-slate-200 group-hover:text-orange-500 group-hover:translate-x-1 transition-all font-black text-sm shrink-0">
                    →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}