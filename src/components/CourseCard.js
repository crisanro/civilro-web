// src/components/CourseCard.js
import Link from 'next/link';

export default function CourseCard({ id, title, category, level, slug }) {
  return (
    <div className="group bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="aspect-video bg-slate-100 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Vista Previa</span>
      </div>
      
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase tracking-tighter">
          {category}
        </span>
        <span className="text-xs text-slate-400 font-medium">{level}</span>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-blue-700 transition-colors">
        {title}
      </h3>

      <Link 
        href={`/cursos/${slug}`}
        className="block w-full py-4 bg-slate-900 text-white text-center rounded-xl font-bold hover:bg-orange-600 transition-colors"
      >
        Ver detalles
      </Link>
    </div>
  );
}