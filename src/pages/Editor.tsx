import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MonacoEditor from '@monaco-editor/react';
import { Code2, Play, Save, ChevronDown, Check, Terminal, X, Zap, Cpu } from 'lucide-react';
import { executeCode } from '@/lib/execution';
import { useCreateSnippet } from '@/hooks/queries';
import { SEO } from '@/components/layout/SEO';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'python', name: 'Python' },
  { id: 'rust', name: 'Rust' },
  { id: 'go', name: 'Go' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
  { id: 'csharp', name: 'C#' },
  { id: 'markdown', name: 'Markdown' }
];

const DEFAULT_CODE: Record<string, string> = {
  javascript: "// Logic parsing enabled.\nconsole.log('DevSignal Execution Array initialized...');\n\nconst greet = (name) => `Status: [SUCCESS] for user: ${name}`;\nconsole.log(greet('SYSTEM_USER'));",
  typescript: "// Type integrity checks active.\nconst status: string = 'Signal Strong';\nconsole.log(`Core integrity: ${status}`);",
  python: "print('Python interpreter initialized...')",
  rust: 'fn main() {\n    println!("Rust memory safety verified.");\n}',
  go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Go routines synchronized.")\n}',
};

export function Editor() {
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(DEFAULT_CODE[LANGUAGES[0].id] || '');
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const saveMutation = useCreateSnippet();

  const handleLanguageChange = (lang: typeof LANGUAGES[0]) => {
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang.id] || '');
    setIsOpen(false);
    setOutput(null);
  };

  const handleRun = async () => {
    setIsExecuting(true);
    await new Promise(r => setTimeout(r, 400));
    const result = await executeCode(code, language.id);
    setOutput(result);
    setIsExecuting(false);
  };

  const editorTheme = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) 
    ? 'vs-dark' 
    : 'vs';

  return (
    <div className="relative h-[calc(100vh-10rem)] flex flex-col gap-6">
      <SEO title="Logic Editor" description="Code execution and logic testing environment." />
      
      {/* Editor Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
            <Code2 size={24} strokeWidth={2} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(222,219,200,0.5)] animate-pulse" />
              Execution Core v2.0
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-text leading-none">Logic <span className="text-primary">Processor</span></h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Language Selector */}
          <div className="relative z-50">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="px-6 py-3 rounded-xl bg-surface border border-border text-text text-sm font-medium hover:bg-surface-hover hover:border-primary/30 transition-all flex items-center gap-3 min-w-[160px] justify-between shadow-sm"
            >
              <span>{language.name}</span>
              <ChevronDown size={16} className={cn("transition-transform duration-300", isOpen && 'rotate-180 text-primary')} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-full min-w-[160px] max-h-[300px] overflow-y-auto glass-panel border border-border rounded-xl shadow-xl z-50 p-1.5 no-scrollbar"
                  >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => handleLanguageChange(lang)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-sm font-medium",
                        language.id === lang.id 
                          ? "bg-primary/10 text-primary" 
                          : "text-text-muted hover:bg-surface-hover hover:text-text"
                      )}
                    >
                      <span>{lang.name}</span>
                      {language.id === lang.id && <Check size={16} strokeWidth={2.5} />}
                    </button>
                  ))}
                </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={handleRun}
            disabled={isExecuting}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md",
              isExecuting 
                ? "bg-surface border border-border text-text-muted opacity-70 cursor-not-allowed" 
                : "bg-primary text-black hover:bg-primary-hover hover:shadow-lg hover:-translate-y-0.5"
            )}
          >
            {isExecuting ? <Cpu size={16} className="animate-spin" /> : <Play size={16} className="fill-current" strokeWidth={2} />}
            {isExecuting ? 'Processing' : 'Execute'}
          </button>
          
          <button 
            onClick={() => saveMutation.mutate({ title: `${language.name} Block`, code, language: language.id })}
            disabled={saveMutation.isPending}
            className="w-[46px] h-[46px] rounded-xl bg-surface border border-border text-text flex items-center justify-center hover:bg-surface-hover hover:border-primary/30 transition-all shadow-sm"
            title="Save Snippet"
          >
            <Save size={18} />
          </button>
        </div>
      </div>

      {/* Monaco Container */}
      <div className="flex-1 min-h-0 flex flex-col relative z-10">
        <div className="glass-panel flex-1 min-h-0 overflow-hidden flex flex-col p-1.5 rounded-3xl shadow-lg border border-border">
          <div className="flex-1 min-h-0 rounded-2xl overflow-hidden relative">
            <MonacoEditor
              height="100%"
              language={language.id}
              theme={editorTheme}
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                fontSize: 14,
                fontFamily: "'Fira Code', 'Inter', monospace",
                minimap: { enabled: false },
                padding: { top: 24, bottom: 24 },
                scrollBeyondLastLine: false,
                lineNumbersMinChars: 3,
                automaticLayout: true,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                renderLineHighlight: "all",
              }}
              loading={
                <div className="w-full h-full flex items-center justify-center bg-bg/50 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-4">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full"
                    />
                    <p className="text-sm font-medium text-text-muted">Initializing Editor Environment...</p>
                  </div>
                </div>
              }
            />
          </div>

          {/* Output Panel */}
          <AnimatePresence>
            {output && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', minHeight: '160px', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-20 bg-surface border-t border-border mt-1.5 rounded-2xl flex flex-col overflow-hidden"
              >
                <div className="flex items-center justify-between px-6 py-3 bg-surface-hover/50 border-b border-border">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text">
                    <Terminal size={14} className="text-primary" /> 
                    Execution Log
                  </div>
                  <button 
                    onClick={() => setOutput(null)}
                    className="w-7 h-7 rounded-lg hover:bg-surface flex items-center justify-center text-text-muted hover:text-text transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="flex-1 p-6 font-mono text-sm overflow-y-auto max-h-[250px] bg-bg/50">
                  <pre className="text-text font-medium leading-relaxed whitespace-pre-wrap">{output}</pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center gap-2 text-xs font-medium text-text-muted shrink-0 pb-4 md:pb-0">
        <Zap size={14} className="text-primary" />
        <span>Status: System synchronized. Logic environment active.</span>
      </div>
    </div>
  );
}
