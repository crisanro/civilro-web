import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { 
  LayoutDashboard, PlaySquare, FileText, 
  Users, MessageSquare, Settings, LogOut, ShieldAlert
} from "lucide-react";

export const metadata = {
  title: "Admin | CivilRo",
};

export default async function AdminLayout({ children }) {
  // 1. SEGURIDAD EXTREMA: Verificamos si es ADMIN
  const user = await getSession();
  console.log("EL USUARIO QUE INTENTA ENTRAR ES:", user?.email, "CON ROL:", user?.rol);
  if (!user) {
    redirect("/login");
  }

  // Si existe el usuario pero NO es administrador, lo pateamos a la página principal
  if (user.rol !== "ADMIN") {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center text-center p-6">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-black text-slate-900 mb-2">Acceso Denegado</h1>
        <p className="text-slate-600 mb-6">No tienes permisos de nivel 5 para ver esta zona de la obra.</p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* BARRA LATERAL (SIDEBAR) */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex shrink-0">
        <div className="h-20 flex items-center px-8 border-b border-slate-800">
          <span className="text-2xl font-black tracking-tight text-white">
            CIVIL<span className="text-orange-500">RO</span> <span className="text-xs font-medium text-slate-500 uppercase tracking-widest ml-1">Admin</span>
          </span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors bg-slate-800 text-white font-medium">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/cursos" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors font-medium">
            <PlaySquare className="w-5 h-5" /> Cursos y Lecciones
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors font-medium">
            <FileText className="w-5 h-5" /> Blog / Posts
          </Link>
          <Link href="/admin/usuarios" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors font-medium">
            <Users className="w-5 h-5" /> Usuarios / Alumnos
          </Link>
          <Link href="/admin/comentarios" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors font-medium relative">
            <MessageSquare className="w-5 h-5" /> Comentarios
            <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-orange-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">NUEVOS</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/admin/configuracion" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors font-medium mb-2">
            <Settings className="w-5 h-5" /> Configuración
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-500 transition-colors font-medium">
            <LogOut className="w-5 h-5" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL (CONTENIDO DINÁMICO) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar móvil (Simplificado) */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-10 shrink-0">
          <h2 className="text-xl font-bold text-slate-800">Panel de Control</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">{user.nombre || "Administrador"}</p>
              <p className="text-xs text-orange-600 font-bold uppercase tracking-widest">Master Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-orange-500 overflow-hidden">
              {user.imagenUrl ? <img src={user.imagenUrl} alt="Admin" /> : <div className="w-full h-full bg-slate-800"></div>}
            </div>
          </div>
        </header>

        {/* Aquí se inyectan las páginas (/admin, /admin/cursos, etc.) */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </main>
      </div>

    </div>
  );
}