import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MonacoEditor from '@monaco-editor/react';
import { Code2, Play, Save, ChevronDown, Check, Terminal, X, Zap, Cpu } from 'lucide-react';
import { executeCode } from '@/lib/execution';
import { useCreateSnippet } from '@/hooks/queries';
import { SEO } from '@/components/layout/SEO';
import { cn } from '@/lib/utils';

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
  javascript: "// Global logic parsing enabled.\nconsole.log('DevSignal Execution Array initialized...');\n\nconst greet = (name) => `Status: [SUCCESS] for user: ${name}`;\nconsole.log(greet('SYSTEM_USER'));",
  typescript: "// Type integrity checks active.\nconst status: string = 'Signal Strong';\nconsole.log(`Core integrity: ${status}`);",
  python: "print('Python interpreter initialized...')",
  rust: 'fn main() {\n    println!("Rust memory safety verified.");\n}',
  go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Go routines synchronized.")\n}',
};

export function Editor() {
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(DEFAULT_CODE[LANGUAGES[0].id] || '');
  const [isOpen, setIsOpen] = useState(false);
  
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

  return (
    <div className="relative h-[calc(100vh-10rem)] flex flex-col gap-10">
      <SEO title="Logic Editor" description="Surgical code execution and logic testing environment." />
      
      {/* Editor Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-4 border-black pb-8 shrink-0">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-black text-white flex items-center justify-center">
            <Code2 size={28} strokeWidth={3} />
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">Logic <span className="text-accent-indigo">Processor.</span></h2>
            <p className="text-[10px] text-zinc-400 font-black tracking-[0.3em] uppercase">Sector: Execution_Core // v2.0</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="px-8 py-3.5 border-2 border-black bg-white flex items-center gap-4 hover:bg-zinc-50 transition-all min-w-[200px] justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">{language.name}</span>
              <ChevronDown size={14} strokeWidth={3} className={cn("transition-transform", isOpen && 'rotate-180')} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-64 max-h-[400px] overflow-y-auto border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 p-2 industrial-grid no-scrollbar"
                  >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => handleLanguageChange(lang)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-black hover:text-white transition-all text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-black"
                    >
                      <span>{lang.name}</span>
                      {language.id === lang.id && <Check size={14} strokeWidth={3} />}
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
              "flex items-center gap-3 px-10 py-3.5 border-2 border-black font-black text-[10px] uppercase tracking-widest transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",
              isExecuting ? "bg-zinc-100 text-zinc-400" : "bg-black text-white hover:bg-zinc-800"
            )}
          >
            {isExecuting ? <Cpu size={16} className="animate-spin" /> : <Play size={16} strokeWidth={3} />}
            {isExecuting ? 'Processing' : 'Execute'}
          </button>
          
          <button 
            onClick={() => saveMutation.mutate({ title: `${language.name} Block`, code, language: language.id })}
            disabled={saveMutation.isPending}
            className="w-14 h-14 border-2 border-black flex items-center justify-center hover:bg-zinc-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
          >
            <Save size={20} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Monaco Container */}
      <div className="flex-1 min-h-0 flex flex-col relative">
        <div className="surgical-card flex-1 min-h-0 bg-white overflow-hidden flex flex-col p-2">
          <div className="flex-1 min-h-0 border-2 border-black/5">
            <MonacoEditor
              height="100%"
              language={language.id}
              theme="vs"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                fontSize: 14,
                fontFamily: "'Fira Code', monospace",
                minimap: { enabled: false },
                padding: { top: 20, bottom: 20 },
                scrollBeyondLastLine: false,
                lineNumbersMinChars: 4,
                automaticLayout: true,
              }}
              loading={
                <div className="w-full h-full flex items-center justify-center bg-zinc-50 border-4 border-dashed border-black">
                  <div className="flex flex-col items-center gap-6">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-black border-t-transparent"
                    />
                    <p className="text-[10px] font-black uppercase tracking-widest">Compiling_Editor...</p>
                  </div>
                </div>
              }
            />
          </div>

          {/* Output Panel */}
          <AnimatePresence>
            {output && (
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: 'auto', minHeight: '160px' }}
                exit={{ height: 0 }}
                className="relative z-20 bg-white border-t-4 border-black flex flex-col"
              >
                <div className="flex items-center justify-between px-8 py-3 bg-zinc-50 border-b-2 border-black">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-black">
                    <Terminal size={14} strokeWidth={3} className="text-accent-indigo" /> 
                    Execution_Log
                  </div>
                  <button 
                    onClick={() => setOutput(null)}
                    className="w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
                  >
                    <X size={16} strokeWidth={3} />
                  </button>
                </div>
                <div className="flex-1 p-8 font-mono text-sm overflow-y-auto max-h-[250px] industrial-grid bg-white">
                  <pre className="text-black font-bold leading-relaxed whitespace-pre-wrap">{output}</pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 shrink-0">
        <Zap size={14} className="text-yellow-500" strokeWidth={3} />
        <span>Status: System synchronized. All logic paths verified for surgical execution.</span>
      </div>
    </div>
  );
}
