import { prisma } from "@/lib/db";
import FormularioBlog from "@/components/admin/FormularioBlog";
import { notFound } from "next/navigation";

export default async function PaginaEditarPost({ params }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: { recursos: true } // Traemos los archivos adjuntos
  });

  if (!post) notFound();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter">Editando: {post.titulo}</h1>
      <FormularioBlog post={post} />
    </div>
  );
}