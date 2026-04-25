"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { User, LogIn, Menu, X, ShieldCheck, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dentro de tu Navbar.js
  const checkSession = async () => {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      
      if (data.loggedIn && data.user) {
        // Usamos una copia del objeto para asegurar que React detecte el cambio
        setUser({ ...data.user }); 
        console.log("Estado 'user' actualizado con rol:", data.user.rol);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

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
          
        {/* ZONA DE ACCIONES */}
        <div className="flex items-center gap-3">
          
          {loading ? (
            <div className="w-24 h-10 bg-slate-100 animate-pulse rounded-full"></div>
          ) : user ? (
            <div className="flex items-center gap-2">
              
              {/* BOTÓN ADMIN (Solo Escritorio y solo si es ADMIN) */}
              {user.rol === "ADMIN" && (
                <Link 
                  href="/admin" 
                  className="hidden md:flex items-center gap-2 text-[10px] font-black tracking-widest uppercase bg-slate-900 text-white px-4 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-slate-900/20"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Panel Admin
                </Link>
              )}

              {/* BOTÓN PERFIL */}
              <Link 
                href="/dashboard" 
                onClick={closeMenu}
                className="flex items-center gap-2 text-sm font-bold text-blue-700 bg-blue-50 px-4 md:px-5 py-2.5 rounded-full border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm group"
              >
                <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:block">Mi Perfil</span>
              </Link>
            </div>
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
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white shadow-2xl absolute w-full left-0 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col px-6 py-8 gap-6">
            
            {/* Si es ADMIN, lo ponemos primero con un estilo especial */}
            {user?.rol === "ADMIN" && (
              <Link 
                href="/admin" 
                onClick={closeMenu}
                className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border border-orange-100 text-orange-700 font-black text-sm uppercase tracking-widest"
              >
                Panel de Administración
                <ShieldCheck className="w-5 h-5" />
              </Link>
            )}

            <Link href="/nosotros" onClick={closeMenu} className="text-base font-bold text-slate-700 hover:text-blue-700">
              Nosotros
            </Link>
            <Link href="/cursos" onClick={closeMenu} className="text-base font-bold text-slate-700 hover:text-blue-700">
              Cursos
            </Link>
            <Link href="/blog" onClick={closeMenu} className="text-base font-bold text-slate-700 hover:text-blue-700">
              Blog del Ingeniero
            </Link>
            
            {user && (
               <Link href="/dashboard" onClick={closeMenu} className="text-base font-bold text-blue-700 flex items-center gap-2 border-t border-slate-100 pt-4">
                 <LayoutDashboard className="w-5 h-5" /> Mi Dashboard Académico
               </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}