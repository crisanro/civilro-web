import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { generarUrlFirmada, detectarTipoVideo } from "@/lib/bunny";
import { serialize } from 'next-mdx-remote/serialize'; 
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

// Componentes Reutilizables
import VideoPlayer from "@/components/VideoPlayer";
import SidebarCurriculum from "@/components/SidebarCurriculum";
import CommentSection from "@/components/CommentSection";
import MarkdownRenderer from "@/components/MarkdownRenderer";

// Iconos
import { Clock, Lock, FileText, Download, PlayCircle, GraduationCap } from "lucide-react";

export default async function LessonPage({ params }) {
  const { slug, id } = await params;
  
  // 1. Sesión y Seguridad
  const user = await getSession();
  const userPlan = user?.plan || "FREE";
  const niveles = { "FREE": 0, "COMUNIDAD": 1, "UNIVERSIDAD": 2, "PRO": 3 };

  // 2. Consulta de Datos (Prisma)
  const leccion = await prisma.leccion.findUnique({
    where: { id: parseInt(id) },
    include: {
      recursos: true,
      curso: { 
        include: { 
          lecciones: { orderBy: { orden: 'asc' } } 
        } 
      }
    }
  });

  if (!leccion) notFound();

  // 3. Lógica de Acceso
  const esAbierta = leccion.esFree || leccion.orden === 1; 
  const nivelRequerido = leccion.curso.accesoMinimo || "COMUNIDAD";
  const tieneAcceso = niveles[userPlan] >= niveles[nivelRequerido];

  if (!tieneAcceso && !esAbierta) {
    redirect(`/cursos/${slug}?error=necesitas-plan`);
  }

  // 4. URL de Video + Serialize MDX en paralelo 👈 NUEVO
  const [video, mdxSource] = await Promise.all([
    Promise.resolve(
      leccion.videoUrl ? detectarTipoVideo(leccion.videoUrl, false) : null
    ),
    serialize(
      (leccion.contenido || '')
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
    )
  ]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 pt-20">
      
      {/* --- COLUMNA PRINCIPAL --- */}
      <div className="flex-1 lg:overflow-y-auto pb-20">
        
        {!tieneAcceso && esAbierta && (
          <div className="bg-orange-600 text-white text-center py-3 text-[10px] font-black uppercase tracking-widest z-20 relative">
            🚀 Estás viendo una clase abierta. Únete al plan {nivelRequerido} para completar el curso.
          </div>
        )}

        <div className="aspect-video bg-slate-900 w-full flex items-center justify-center border-b border-slate-200 shadow-2xl relative z-10">
          {video ? (
            <VideoPlayer video={video} />
          ) : (
            <div className="flex flex-col items-center gap-4 text-slate-500">
              <PlayCircle className="w-12 h-12 animate-pulse" />
              <p className="font-bold uppercase tracking-widest text-xs">Preparando señal segura...</p>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto p-6 md:p-12">
          
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                Lección {leccion.orden}
              </span>
              <div className="h-px w-12 bg-slate-200" />
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                <Clock className="w-3 h-3" /> {leccion.duracion || "15"} MIN
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8 uppercase">
              {leccion.titulo}
            </h1>
          </header>
          
          {/* 👇 Cambia content por source */}
          <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl shadow-slate-200/50 border border-white mb-20">
            <MarkdownRenderer source={mdxSource} />
          </div>

          <section id="foro" className="pt-10 border-t border-slate-200">
            <h3 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4 tracking-tighter italic uppercase">
               Consultas Técnicas
               <div className="h-1 flex-1 bg-slate-100 rounded-full" />
            </h3>
            
            {tieneAcceso ? (
              <CommentSection leccionId={leccion.id} />
            ) : (
              <div className="p-16 bg-slate-100 rounded-[3rem] text-center border-4 border-dashed border-slate-200 shadow-inner">
                <Lock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Foro Protegido</p>
                <p className="text-slate-500 mt-2 font-medium">El debate técnico es exclusivo para alumnos del plan {nivelRequerido}.</p>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* --- SIDEBAR --- */}
      <aside className="w-full lg:w-[450px] bg-slate-100/50 border-l border-slate-200 p-8 overflow-y-auto">
        <div className="sticky top-10 space-y-12">
          
          {tieneAcceso && leccion.recursos.length > 0 && (
            <div>
              <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-[0.3em] mb-6 flex items-center gap-2">
                <Download className="w-4 h-4 text-blue-600" /> Material de Apoyo
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {leccion.recursos.map(rec => (
                  <a 
                    key={rec.id} 
                    href={rec.url} 
                    target="_blank" 
                    className="flex items-center justify-between p-5 bg-white rounded-[1.5rem] border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all group"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-blue-50 transition-colors">
                        <FileText className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                      </div>
                      <span className="text-xs font-black text-slate-700 group-hover:text-blue-600 truncate uppercase">
                         {rec.nombre}
                      </span>
                    </div>
                    <Download className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:scale-110 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-[0.3em] mb-6 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-orange-600" /> Progreso del Curso
            </h4>
            <SidebarCurriculum 
              lecciones={leccion.curso.lecciones} 
              currentId={leccion.id} 
              slug={slug} 
              tieneAcceso={tieneAcceso}
            />
          </div>
          
        </div>
      </aside>
    </div>
  );
}