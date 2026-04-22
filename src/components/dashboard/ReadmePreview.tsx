import ReactMarkdown from 'react-markdown';
import { BookOpen, Terminal } from 'lucide-react';

interface ReadmePreviewProps {
  content?: string;
}

export function ReadmePreview({ content }: ReadmePreviewProps) {
  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-zinc-50 border-4 border-black border-dashed relative overflow-hidden">
        <div className="w-20 h-20 border-4 border-black/10 flex items-center justify-center text-zinc-200 mb-8 relative z-10">
          <BookOpen size={40} strokeWidth={3} />
        </div>
        <p className="text-zinc-400 font-black uppercase tracking-[0.4em] text-[10px] relative z-10">SIGNAL_LOST: README.md not found</p>
        <div className="industrial-grid absolute inset-0 opacity-5" />
      </div>
    );
  }

  return (
    <div className="surgical-card bg-white relative overflow-hidden group">
      <div className="p-10 md:p-12 flex items-center justify-between border-b-4 border-black bg-zinc-50">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 border-4 border-black bg-black text-white flex items-center justify-center">
            <BookOpen size={32} strokeWidth={3} />
          </div>
          <div>
            <h3 className="text-3xl font-black tracking-tighter text-black uppercase leading-none">Documentation</h3>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mt-3">Project_Technical_Archive</p>
          </div>
        </div>
        <Terminal size={32} strokeWidth={3} className="text-black/10 group-hover:text-black transition-colors" />
      </div>
      
      <div className="p-12 md:p-16 relative z-10">
        <div className="prose prose-zinc max-w-none 
          prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-black prose-headings:uppercase
          prose-p:text-zinc-600 prose-p:leading-relaxed prose-p:font-bold prose-p:italic
          prose-a:text-accent-indigo prose-a:font-black hover:underline
          prose-code:text-accent-indigo prose-code:bg-zinc-100 prose-code:px-2 prose-code:py-1 prose-code:border prose-code:border-black/5 prose-code:rounded-none prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-zinc-900 prose-pre:text-white prose-pre:border-4 prose-pre:border-black prose-pre:rounded-none prose-pre:p-8 prose-pre:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]
          prose-img:border-4 prose-img:border-black prose-img:rounded-none
          prose-strong:text-black prose-strong:font-black
        ">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
      
      <div className="industrial-grid absolute inset-0 opacity-5 pointer-events-none" />
    </div>
  );
}
