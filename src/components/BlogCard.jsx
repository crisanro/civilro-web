// src/components/BlogCard.jsx
export default function BlogCard({ post }) {
  return (
    <article className="py-8 border-b border-slate-100 last:border-0 group cursor-pointer">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <span className="text-sm text-slate-500 font-medium">
            {new Date(post.fecha).toLocaleDateString()}
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2 group-hover:text-orange-600 transition-colors">
            {post.titulo}
          </h2>
          <p className="text-slate-600 mt-4 leading-relaxed line-clamp-2">
            {post.resumen}
          </p>
          <div className="mt-6 flex items-center gap-2 text-orange-600 font-bold text-sm">
            Leer artículo completo 
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </div>
        </div>
        {post.imagenUrl && (
          <div className="w-full md:w-64 aspect-video bg-slate-100 rounded-2xl overflow-hidden">
             <img src={post.imagenUrl} alt={post.titulo} className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </article>
  );
}