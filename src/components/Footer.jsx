import Link from "next/link";
import { Mail } from "lucide-react"; // Solo importamos Mail que sí es estándar

// ─── ICONOS SVG NATIVOS (Más rápidos y ligeros) ───
const FacebookIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 7.1c-.2.8-.3 1.8-.3 2.9v4c0 1.1.1 2.1.3 2.9.2.9.9 1.6 1.8 1.8.8.2 2.5.3 7.7.3s6.9-.1 7.7-.3c.9-.2 1.6-.9 1.8-1.8.2-.8.3-1.8.3-2.9v-4c0-1.1-.1-2.1-.3-2.9-.2-.9-.9-1.6-1.8-1.8C18.9 5.1 17.2 5 12 5s-6.9.1-7.7.3c-.9.2-1.6.9-1.8 1.8z" />
    <path d="m10 15 5-3-5-3v6z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ─── COMPONENTE FOOTER ───
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-orange-600">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Columna 1: Marca */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-black tracking-tight text-white mb-4 block">
              CIVIL<span className="text-orange-500">RO</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              La academia técnica especializada para ingenieros civiles y estudiantes que buscan dominar la práctica real en obra.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-orange-500 transition-colors">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-orange-500 transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-orange-500 transition-colors">
                <YoutubeIcon className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-orange-500 transition-colors">
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="text-white font-bold mb-4">Plataforma</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/cursos" className="hover:text-orange-400 transition-colors">Todos los Cursos</Link></li>
              <li><Link href="/#planes" className="hover:text-orange-400 transition-colors">Planes y Precios</Link></li>
              <li><Link href="/blog" className="hover:text-orange-400 transition-colors">Blog del Ingeniero</Link></li>
              <li><Link href="/nosotros" className="hover:text-orange-400 transition-colors">Nuestra Metodología</Link></li>
            </ul>
          </div>

          {/* Columna 3: Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/terminos" className="hover:text-orange-400 transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="/privacidad" className="hover:text-orange-400 transition-colors">Políticas de Privacidad</Link></li>
              <li><Link href="/reembolsos" className="hover:text-orange-400 transition-colors">Políticas de Reembolso</Link></li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="text-white font-bold mb-4">¿Necesitas ayuda?</h4>
            <p className="text-sm text-slate-400 mb-4">
              Estamos aquí para ayudarte en tu crecimiento profesional.
            </p>
            <a href="mailto:soporte@civilro.com" className="inline-flex items-center gap-2 text-sm font-bold ...">
              <Mail className="w-4 h-4" />
              <span>soporte@civilro.com</span> {/* Envolverlo en span ayuda a React a identificarlo mejor */}
            </a>
          </div>

        </div>

        {/* Barra inferior */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} CivilRo. Todos los derechos reservados.</p>
          <p>Hecho con pasión para la ingeniería.</p>
        </div>
      </div>
    </footer>
  );
}