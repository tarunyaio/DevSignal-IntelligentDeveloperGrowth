import ReactMarkdown from 'react-markdown';
import { BookOpen, Terminal } from 'lucide-react';

interface ReadmePreviewProps {
  content?: string;
}

export function ReadmePreview({ content }: ReadmePreviewProps) {
  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-24 rounded-3xl bg-surface-hover/30 border border-border border-dashed relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center text-text-muted mb-6 shadow-sm">
          <BookOpen size={28} />
        </div>
        <p className="text-text-muted font-medium text-sm">Documentation not found</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl relative overflow-hidden group border border-border">
      <div className="p-8 md:p-10 flex items-center justify-between border-b border-border bg-surface-hover/50">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
            <BookOpen size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-text leading-none">Documentation</h3>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider mt-2">Project Technical Archive</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center">
          <Terminal size={18} className="text-text-muted group-hover:text-primary transition-colors" />
        </div>
      </div>
      
      <div className="p-8 md:p-12 relative z-10 bg-bg/50">
        <div className="prose prose-zinc dark:prose-invert max-w-none 
          prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-text
          prose-p:text-text-muted prose-p:leading-relaxed
          prose-a:text-primary prose-a:font-medium hover:prose-a:text-primary-hover prose-a:no-underline
          prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:border prose-code:border-primary/10 prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:p-6 prose-pre:shadow-sm
          prose-img:rounded-xl prose-img:shadow-sm prose-img:border prose-img:border-border
          prose-strong:text-text prose-strong:font-semibold
        ">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
