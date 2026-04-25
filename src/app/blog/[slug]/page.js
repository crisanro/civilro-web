import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth"; // Usaremos esta que ya tienes
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CommentSection from "@/components/CommentSection";
import { Clock, Lock, User, Calendar } from "lucide-react";
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { serialize } from 'next-mdx-remote/serialize';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default async function DetallePost({ params }) {
  const { slug } = await params;
  
  // 1. Obtenemos el usuario con tu función personalizada
  const user = await getSession(); 
  const userPlan = user?.plan || "FREE";

  // 2. Buscamos el post incluyendo sus comentarios (esto es clave para el CommentSection)
  const post = await prisma.post.findUnique({
    where: { slug: slug },
    include: {
      comentarios: {
        where: { parentId: null }, // Solo los hilos principales
        include: {
          user: true,
          respuestas: {
            include: { user: true }
          }
        },
        orderBy: { fecha: 'desc' }
      }
    }
  });

  if (!post) notFound();

  const mdxSource = await serialize(
    post.contenido
      .replaceAll('\\n', '\n')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/^\s+(<[A-Z][a-zA-Z]*)/gm, '$1'),
    {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    }
  );
  // --- CONFIGURACIÓN DE COMPONENTES PARA EL BLOG (Igual que el tuyo) ---
  const components = {
    h1: (props) => <h1 className="text-5xl font-black text-slate-900 mb-8 mt-12 tracking-tighter leading-tight" {...props} />,
    h2: (props) => <h2 className="text-3xl font-black text-slate-800 mb-6 mt-16 border-b-2 border-slate-100 pb-2" {...props} />,
    h3: (props) => <h3 className="text-2xl font-black text-orange-600 mb-4 mt-8" {...props} />,
    p: (props) => <p className="text-lg text-slate-600 leading-[1.8] mb-8" {...props} />,
    strong: (props) => <strong className="font-black text-slate-900 bg-orange-50 px-1 rounded" {...props} />,
    blockquote: (props) => (
      <blockquote className="border-l-8 border-orange-500 bg-slate-50 p-8 rounded-r-3xl italic text-xl text-slate-700 my-10 shadow-inner" {...props} />
    ),
    img: (props) => (
      <span className="block my-12">
        <img {...props} className="rounded-[2.5rem] shadow-2xl mx-auto border-4 border-white" />
        {props.alt && <span className="block text-center text-sm font-bold text-slate-400 mt-4 uppercase tracking-widest">{props.alt}</span>}
      </span>
    ),
    ul: (props) => <ul className="space-y-4 mb-10 ml-6 list-none" {...props} />,
    li: (props) => (
      <li className="flex items-start gap-3 text-lg text-slate-600">
        <span className="w-2 h-2 rounded-full bg-orange-500 mt-3 shrink-0" />
        <span {...props} />
      </li>
    ),
    a: (props) => <a className="text-blue-600 font-black underline decoration-blue-200 decoration-4 hover:decoration-blue-500 transition-all" {...props} />
  };

  return (
    <main className="bg-slate-50 min-h-screen pb-20 pt-24">
      <article className="max-w-4xl mx-auto px-6">
        
        {/* Cabecera Editorial */}
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
              Ingeniería Estructural
            </span>
            <span className="flex items-center gap-1 text-slate-400 text-xs font-bold uppercase">
              <Calendar className="w-4 h-4" /> 
              {new Date(post.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-none">
            {post.titulo}
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-12">
             <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs font-bold ring-4 ring-white shadow-lg">
               CR
             </div>
             <span className="font-black text-slate-900 uppercase text-xs tracking-widest">{post.autor}</span>
          </div>
        </header>

        {/* Imagen de Portada */}
        {post.imagenUrl && (
          <div className="mb-16 rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white">
            <img src={post.imagenUrl} alt={post.titulo} className="w-full h-[500px] object-cover" />
          </div>
        )}

        {/* CONTENIDO DEL POST */}
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl shadow-slate-200/50 border border-white mb-20">
          <MarkdownRenderer source={mdxSource} />
        </div>

        {/* SECCIÓN DE COMENTARIOS */}
        <section id="comentarios" className="mt-20">
          <div className="flex items-center gap-4 mb-10">
             <h3 className="text-3xl font-black text-slate-900 italic">Comunidad CivilRo</h3>
             <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Permitimos ver comentarios si el usuario no es FREE */}
          {userPlan !== "FREE" ? (
            <CommentSection 
              usuarioActual={user} 
              postId={post.id} 
              comentarios={post.comentarios} 
            />
          ) : (
            <div className="p-12 bg-slate-100 rounded-[3rem] border-4 border-dashed border-slate-200 text-center">
              <Lock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-xl font-black text-slate-800">Foro Exclusivo</p>
              <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                Para comentar en el blog necesitas ser miembro activo. ¡Únete a la comunidad de ingenieros hoy mismo!
              </p>
              <button className="mt-6 bg-orange-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-orange-100 hover:scale-105 transition-transform">
                Ver Planes Pro
              </button>
            </div>
          )}
        </section>

      </article>
    </main>
  );
}