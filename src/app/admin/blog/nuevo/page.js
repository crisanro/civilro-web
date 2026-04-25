import FormularioBlog from "@/components/admin/FormularioBlog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PaginaNuevoPost() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blog" className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Redactar Artículo</h1>
      </div>
      <FormularioBlog />
    </div>
  );
}