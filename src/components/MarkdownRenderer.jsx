'use client'; // 👈 CRÍTICO

import { MDXRemote } from 'next-mdx-remote'; // 👈 SIN /rsc
import { mdxComponents } from '@/components/blog/MDXComponents';

const components = {
  ...mdxComponents,
  h1: (props) => <h1 className="text-5xl font-black text-slate-900 mb-8 mt-12 tracking-tighter leading-tight" {...props} />,
  h2: (props) => <h2 className="text-3xl font-black text-slate-800 mb-6 mt-16 border-b-2 border-slate-100 pb-2" {...props} />,
  h3: (props) => <h3 className="text-2xl font-black text-orange-600 mb-4 mt-8 uppercase tracking-wide" {...props} />,
  p: (props) => <p className="text-lg text-slate-600 leading-[1.8] mb-8" {...props} />,
  strong: (props) => <strong className="font-black text-slate-900 bg-orange-50 px-1 rounded" {...props} />,
  blockquote: (props) => (
    <div className="relative my-10">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-orange-500 rounded-full" />
      <blockquote className="bg-slate-50 p-8 pl-10 rounded-r-[2.5rem] italic text-xl text-slate-700 shadow-inner border border-slate-100" {...props} />
    </div>
  ),
  img: (props) => (
    <span className="block my-12 group text-center">
      <img {...props} className="rounded-[2.5rem] shadow-2xl mx-auto border-8 border-white max-w-full transition-transform duration-500 group-hover:scale-[1.02]" />
      {props.alt && (
        <span className="inline-block bg-slate-100 text-slate-400 text-[10px] font-black mt-4 px-4 py-1 rounded-full uppercase tracking-[0.2em]">
          {props.alt}
        </span>
      )}
    </span>
  ),
  ul: (props) => <ul className="space-y-4 mb-10 ml-6" {...props} />,
  li: (props) => (
    <li className="flex items-start gap-4 text-lg text-slate-600">
      <span className="w-2.5 h-2.5 rounded-full bg-orange-500 mt-2.5 shrink-0 shadow-sm" />
      <span {...props} />
    </li>
  ),
  a: ({ children, ...props }) => {
    const url = props.href || "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=))([\w\-]{11})/)?.[1];
      if (videoId) return (
        <div className="aspect-video w-full my-12 shadow-2xl rounded-[2.5rem] overflow-hidden border-8 border-white bg-slate-900">
          <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video" frameBorder="0" allowFullScreen />
        </div>
      );
    }
    if (url.includes("amazon") || url.includes("amzn")) return (
      <a href={url} target="_blank" className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-3 rounded-2xl font-black no-underline hover:bg-slate-900 transition-all shadow-lg my-4">
        🛒 {children}
      </a>
    );
    return (
      <a className="text-blue-600 font-black underline decoration-blue-200 decoration-4 hover:decoration-blue-500 transition-all" target="_blank" {...props}>
        {children}
      </a>
    );
  },
  hr: () => <hr className="my-20 border-t-2 border-slate-100 border-dashed" />,
};

// Este componente recibe `source` (ya serializado), NO el string crudo
export default function MarkdownRenderer({ source }) {
  if (!source) return null;
  return (
    <div className="prose prose-slate max-w-none">
      <MDXRemote {...source} components={components} />
    </div>
  );
}