"use client";
import Link from "next/link";
import { PlayCircle, Lock } from "lucide-react";

export default function SidebarCurriculum({ lecciones, currentId, slug, tieneAcceso }) {
  return (
    <div className="space-y-2">
      {lecciones.map((lec) => {
        const isCurrent = lec.id === currentId;
        const isFreePreview = lec.orden === 1; // La primera siempre es gratis
        const canWatch = tieneAcceso || isFreePreview;

        // ESTADO 1: BLOQUEADO
        if (!canWatch) {
          return (
            <div key={lec.id} className="flex items-center justify-between p-3 bg-slate-100 rounded-xl border border-slate-200 opacity-60">
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-mono text-xs">{lec.orden.toString().padStart(2, '0')}</span>
                <span className="text-slate-500 text-sm font-medium">{lec.titulo}</span>
              </div>
              <Lock className="w-4 h-4 text-slate-400" />
            </div>
          );
        }

        // ESTADO 2: DESBLOQUEADO (Clickable)
        return (
          <Link href={`/cursos/${slug}/${lec.id}`} key={lec.id}>
            <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
              isCurrent 
                ? 'bg-white border-blue-500 shadow-sm border-l-4 border-l-blue-600' 
                : 'bg-white border-slate-200 hover:border-orange-400'
            }`}>
              <div className="flex items-center gap-3">
                <span className={`font-mono text-xs ${isCurrent ? 'text-blue-600' : 'text-slate-400'}`}>
                  {lec.orden.toString().padStart(2, '0')}
                </span>
                <span className={`text-sm font-medium ${isCurrent ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>
                  {lec.titulo}
                </span>
              </div>
              <PlayCircle className={`w-4 h-4 ${isCurrent ? 'text-blue-600' : 'text-slate-400'}`} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}