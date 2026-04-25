"use client";
import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";

export default function BotonEliminarUniversal({ 
  id, 
  confirmText, 
  onConfirm, 
  titulo = "Confirmar eliminación",
  mensaje = "Escribe el identificador para confirmar:" 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAction = async () => {
    if (inputVal !== confirmText) return;
    
    setIsDeleting(true);
    try {
      await onConfirm(id); // Ejecuta la acción que le pasemos
      setIsOpen(false);
    } catch (error) {
      alert("Error al eliminar");
    } finally {
      setIsDeleting(false);
      setInputVal("");
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-red-600 transition-all border border-transparent hover:border-slate-100"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-black text-xl uppercase tracking-tighter text-slate-900">{titulo}</h3>
            </div>
            
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              {mensaje}
              <span className="block mt-2 font-mono bg-slate-100 p-2 rounded-lg text-slate-900 text-center">{confirmText}</span>
            </p>

            <input 
              type="text" 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl mb-6 focus:border-red-500 outline-none font-bold"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Confirmar..."
            />

            <div className="flex gap-3">
              <button onClick={() => setIsOpen(false)} className="flex-1 py-4 font-black text-slate-400">Cancelar</button>
              <button 
                onClick={handleAction}
                disabled={inputVal !== confirmText || isDeleting}
                className={`flex-1 py-4 rounded-2xl font-black text-white transition-all ${
                  inputVal === confirmText && !isDeleting ? 'bg-red-600 shadow-lg' : 'bg-slate-200 cursor-not-allowed'
                }`}
              >
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}