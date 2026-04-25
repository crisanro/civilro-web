import { Lock, Zap } from "lucide-react";
import Link from "next/link";

export default function Paywall({ planRequerido, precio = "4.99" }) {
  return (
    <div className="bg-slate-900/90 backdrop-blur-sm border-2 border-dashed border-orange-500/30 rounded-3xl p-10 text-center my-8">
      <div className="mx-auto w-16 h-16 bg-orange-600/20 text-orange-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <Lock className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-black text-white mb-3">Contenido Protegido</h3>
      <p className="text-slate-400 mb-8 max-w-sm mx-auto">
        Esta lección es exclusiva para miembros del <span className="text-orange-500 font-bold">Plan {planRequerido}</span>. 
        Únete ahora y desbloquea todo el material técnico.
      </p>
      
      <div className="flex flex-col gap-4 items-center">
        <Link 
          href={`/api/checkout?plan=${planRequerido}`}
          className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-2 shadow-lg shadow-orange-900/20"
        >
          <Zap className="w-5 h-5" />
          Desbloquear Acceso por ${precio}
        </Link>
        <p className="text-xs text-slate-500 italic">Pago único. Acceso de por vida a la comunidad.</p>
      </div>
    </div>
  );
}