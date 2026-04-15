import React from 'react';
import ReactMarkdown from 'react-markdown';
import { BookOpen } from 'lucide-react';

interface ReadmePreviewProps {
  content?: string;
}

export function ReadmePreview({ content }: ReadmePreviewProps) {
  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-[2.5rem] border border-white/5">
        <BookOpen className="text-slate-600 mb-4" size={48} />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">No README available for this project.</p>
      </div>
    );
  }

  return (
    <div className="p-10 rounded-[2.5rem] bg-slate-900/60 border border-white/5 backdrop-blur-3xl">
      <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10">
        <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
          <BookOpen size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black tracking-tighter">Documentation</h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Project README.md</p>
        </div>
      </div>
      
      <div className="prose prose-invert prose-purple max-w-none 
        prose-headings:font-black prose-headings:tracking-tighter
        prose-p:text-slate-400 prose-p:leading-relaxed
        prose-a:text-purple-400 prose-a:font-bold hover:prose-a:text-purple-300
        prose-code:text-purple-300 prose-code:bg-purple-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-2xl
        prose-img:rounded-3xl prose-img:border prose-img:border-white/10 shadow-2xl
      ">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
