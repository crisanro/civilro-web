"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { User, LogIn, Menu, X } from "lucide-react"; // Añadimos Menu y X

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para el menú móvil

  const checkSession = async () => {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      if (data.loggedIn) setUser(data.user);
      else setUser(null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // Función para cerrar el menú al hacer clic en un enlace
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO INSTITUCIONAL */}
        <Link href="/" onClick={closeMenu} className="text-2xl font-black tracking-tight text-slate-900 group">
          CIVIL<span className="text-orange-600 group-hover:text-blue-700 transition-colors">RO</span>
        </Link>

        {/* LINKS DE NAVEGACIÓN (ESCRITORIO) */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/nosotros" className="text-sm font-bold text-slate-500 hover:text-blue-700 transition-colors">
            Nosotros
          </Link>
          <Link href="/cursos" className="text-sm font-bold text-slate-500 hover:text-blue-700 transition-colors">
            Cursos
          </Link>
          <Link href="/blog" className="text-sm font-bold text-slate-500 hover:text-blue-700 transition-colors">
            Blog
          </Link>
        </div>
          
        {/* ZONA DE AUTENTICACIÓN Y BOTÓN HAMBURGUESA */}
        <div className="flex items-center gap-4">
          
          {/* Botón de Perfil o Login (Siempre visible) */}
          {loading ? (
            <div className="w-24 h-10 bg-slate-100 animate-pulse rounded-full"></div>
          ) : user ? (
            <Link 
              href="/dashboard" 
              onClick={closeMenu}
              className="flex items-center gap-2 text-sm font-bold text-blue-700 bg-blue-50 px-4 md:px-5 py-2.5 rounded-full border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm group"
            >
              <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:block">Mi Perfil</span>
            </Link>
          ) : (
            <Link 
              href="/login" 
              onClick={closeMenu}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 md:px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-slate-900/20"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:block">Entrar</span>
            </Link>
          )}

          {/* BOTÓN HAMBURGUESA (MÓVIL) */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-orange-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white shadow-xl absolute w-full left-0">
          <div className="flex flex-col px-6 py-6 gap-6">
            <Link 
              href="/nosotros" 
              onClick={closeMenu}
              className="text-base font-bold text-slate-700 hover:text-orange-600 flex items-center justify-between"
            >
              Nosotros
            </Link>
            <Link 
              href="/cursos" 
              onClick={closeMenu}
              className="text-base font-bold text-slate-700 hover:text-orange-600 flex items-center justify-between"
            >
              Cursos
            </Link>
            <Link 
              href="/blog" 
              onClick={closeMenu}
              className="text-base font-bold text-slate-700 hover:text-orange-600 flex items-center justify-between"
            >
              Blog del Ingeniero
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}