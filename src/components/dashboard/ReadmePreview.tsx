import ReactMarkdown from 'react-markdown';
import { BookOpen } from 'lucide-react';

interface ReadmePreviewProps {
  content?: string;
}

export function ReadmePreview({ content }: ReadmePreviewProps) {
  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-24 neo-flat rounded-[3rem] border border-white/[0.01]">
        <div className="w-20 h-20 neo-icon text-slate-800 mb-6">
          <BookOpen size={32} />
        </div>
        <p className="text-slate-600 font-black uppercase tracking-[0.3em] text-[10px]">No signal found in README.md</p>
      </div>
    );
  }

  return (
    <div className="p-12 md:p-16 rounded-[4rem] neo-flat border border-white/[0.01]">
      <div className="flex items-center gap-5 mb-12 pb-8 neo-pressed-bottom border-white/[0.05]">
        <div className="w-16 h-16 neo-icon text-neo-accent-blue">
          <BookOpen size={28} strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="text-3xl font-black tracking-tighter text-slate-200">Documentation</h3>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Project Technical Archive</p>
        </div>
      </div>
      
      <div className="prose prose-invert prose-blue max-w-none 
        prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-slate-200
        prose-p:text-slate-500 prose-p:leading-relaxed prose-p:font-medium
        prose-a:text-neo-accent-blue prose-a:font-black hover:neo-accent-blue/80
        prose-code:text-neo-accent-blue prose-code:bg-white/[0.03] prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-white/[0.02] prose-pre:border prose-pre:border-white/[0.05] prose-pre:rounded-[2rem] prose-pre:p-8
        prose-img:rounded-[2rem] prose-img:border prose-img:border-white/10
      ">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
