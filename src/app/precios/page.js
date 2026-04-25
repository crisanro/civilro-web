import { Check } from "lucide-react";
import Link from "next/link";

export default function Precios() {
  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* ENCABEZADO */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Invierte en tu <span className="text-orange-600">Futuro Profesional</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Sube de nivel con cursos diseñados para ingenieros civiles que buscan destacar en el mercado laboral. Cancela cuando quieras.
          </p>
        </div>

        {/* TARJETAS DE PRECIOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* PLAN UNIVERSIDAD */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col relative">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Plan Universidad</h3>
            <p className="text-slate-500 text-sm mb-6 h-10">Perfecto para estudiantes que necesitan dominar los fundamentos.</p>
            
            <div className="mb-6">
              <span className="text-4xl font-black text-slate-900">$15</span>
              <span className="text-slate-500 font-medium">/mes</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-orange-600 shrink-0" />
                <span className="text-slate-700 font-medium text-sm">Acceso a todos los cursos de nivel Básico e Intermedio</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-orange-600 shrink-0" />
                <span className="text-slate-700 font-medium text-sm">Certificados de finalización avalados</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-orange-600 shrink-0" />
                <span className="text-slate-700 font-medium text-sm">Comunidad exclusiva de alumnos</span>
              </li>
            </ul>

            {/* Este botón llamará al Checkout de Stripe en el futuro */}
            <form action="/api/stripe/checkout" method="POST">
              <input type="hidden" name="plan" value="UNIVERSIDAD" />
              <Link href="/checkout?plan=UNIVERSIDAD" className="w-full text-center block bg-slate-100 text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                Elegir Plan Universidad
              </Link>
            </form>
          </div>

          {/* PLAN PRO (El Destacado) */}
          <div className="bg-slate-900 rounded-3xl p-8 border-2 border-orange-500 shadow-2xl shadow-orange-500/20 flex flex-col relative transform md:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              El más popular
            </div>
            
            <h3 className="text-2xl font-black text-white mb-2">Plan PRO</h3>
            <p className="text-slate-400 text-sm mb-6 h-10">Para ingenieros que diseñan, calculan y construyen en la vida real.</p>
            
            <div className="mb-6">
              <span className="text-4xl font-black text-white">$29</span>
              <span className="text-slate-400 font-medium">/mes</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-slate-300 font-medium text-sm">Todo lo del Plan Universidad</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-slate-300 font-medium text-sm">Acceso a Masterclasses y Especializaciones Avanzadas</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-slate-300 font-medium text-sm">Descarga de Plantillas Excel y Modelos ETABS/SAP2000</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-slate-300 font-medium text-sm">Soporte prioritario del Ing. Cristhian</span>
              </li>
            </ul>

            {/* Este botón llamará al Checkout de Stripe en el futuro */}
            <form action="/api/stripe/checkout" method="POST">
              <input type="hidden" name="plan" value="PRO" />
              <Link href="/checkout?plan=PRO" className="w-full text-center block bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-500 transition-colors shadow-lg shadow-orange-600/30">
                Obtener Acceso PRO
              </Link>
            </form>
          </div>

        </div>
        
        {/* BOTÓN PARA VOLVER */}
        <div className="mt-12 text-center">
          <Link href="/dashboard" className="text-slate-500 font-bold hover:text-slate-900 transition-colors">
            Volver a mi Panel
          </Link>
        </div>

      </div>
    </main>
  );
}