"use client";
import { useState } from "react";

export default function CalculadoraZapata() {
  // 1. Estados para los inputs
  const [anchoCol, setAnchoCol] = useState("");
  const [baseCol, setBaseCol] = useState("");
  const [carga, setCarga] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [condicion, setCondicion] = useState("0");

  // 2. Estado para el resultado
  const [resultado, setResultado] = useState(null);

  const calcularBaseZap = () => {
    // Validar que no haya campos vacíos
    if (!anchoCol || !baseCol || !carga || !capacidad) {
      alert("Por favor, completa todos los campos técnicos.");
      return;
    }

    // Convertimos a números para operar
    const p = parseFloat(carga);
    const q = parseFloat(capacidad);
    const ancho = parseFloat(anchoCol);
    const base = parseFloat(baseCol);

    // Lógica original de tu script
    let f = condicion === "0" ? 1.45 : 1.15;
    
    const a = ancho / 100;
    const b = base / 100;
    const Acim = (p / q) * f;
    
    const d = 2 * (a + b);
    const e = (a * b) - Acim;
    
    // Fórmula de la cuadrática que tenías
    const x = (-d + Math.pow(Math.pow(d, 2) - (16 * e), 0.5)) / 8;

    const resA = (a + 2 * x).toFixed(1);
    const resB = (b + 2 * x).toFixed(1);

    setResultado({ A: resA, B: resB });
  };

  return (
    <div className="my-8 p-6 bg-slate-50 border-2 border-slate-900 rounded-xl shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
      <div className="flex items-center gap-2 mb-6 text-slate-900">
        <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
        <h3 className="font-black uppercase tracking-tighter text-lg">Dimensionamiento de Zapata</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna 1 */}
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Ancho Columna (a) [cm]</label>
            <input type="number" value={anchoCol} onChange={(e) => setAnchoCol(e.target.value)} 
                   className="w-full border-2 border-slate-300 p-2 rounded-lg focus:border-orange-600 outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Base Columna (b) [cm]</label>
            <input type="number" value={baseCol} onChange={(e) => setBaseCol(e.target.value)}
                   className="w-full border-2 border-slate-300 p-2 rounded-lg focus:border-orange-600 outline-none transition-colors" />
          </div>
        </div>

        {/* Columna 2 */}
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Carga de Servicio [Tn]</label>
            <input type="number" value={carga} onChange={(e) => setCarga(e.target.value)}
                   className="w-full border-2 border-slate-300 p-2 rounded-lg focus:border-orange-600 outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Capacidad Portante [Tn/m²]</label>
            <input type="number" value={capacidad} onChange={(e) => setCapacidad(e.target.value)}
                   className="w-full border-2 border-slate-300 p-2 rounded-lg focus:border-orange-600 outline-none transition-colors" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Condición de Estructura</label>
        <select value={condicion} onChange={(e) => setCondicion(e.target.value)}
                className="w-full border-2 border-slate-300 p-2 rounded-lg bg-white">
          <option value="0">Sin Subsuelos</option>
          <option value="1">Con Subsuelos</option>
        </select>
      </div>

      <button onClick={calcularBaseZap} 
              className="w-full mt-8 bg-slate-900 text-white font-black py-4 rounded-xl uppercase tracking-widest hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
        Calcular Dimensiones
      </button>

      {resultado && (
        <div className="mt-8 p-5 bg-white border-2 border-orange-500 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-500">
          <p className="text-xs font-black uppercase text-orange-600 mb-2">Resultado del Cálculo</p>
          <p className="text-sm font-bold text-slate-800 leading-relaxed">
            * Te recomiendo usar los siguientes valores, para el ancho <span className="bg-orange-100 px-1 font-black text-orange-700">(A)</span> de la zapata <span className="text-xl">{resultado.A}m</span> y para la base <span className="bg-orange-100 px-1 font-black text-orange-700">(B)</span> <span className="text-xl">{resultado.B}m</span>.
          </p>
          <p className="mt-4 text-[10px] italic text-slate-400 font-medium">Firma: Ing. Cristhian Romero García</p>
        </div>
      )}
    </div>
  );
}