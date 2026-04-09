import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MonacoEditor from '@monaco-editor/react';
import { Code2, Play, Save, ChevronDown, Check, Terminal, X, Zap } from 'lucide-react';
import { executeCode } from '@/lib/execution';
import { useCreateSnippet } from '@/hooks/queries';

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
  javascript: "// Yeh simple JS code hai\nconsole.log('Hello, DevSignal!');\n\nconst greet = (name) => `Namaste, ${name}!`;\nconsole.log(greet('User'));",
  typescript: "// Type safety ke saath code likhein\nconst greeting: string = 'Hello, DevSignal!';\nconsole.log(greeting);",
  python: "print('Hello, DevSignal!')",
  rust: 'fn main() {\n    println!("Hello, DevSignal!");\n}',
  go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, DevSignal!")\n}',
};

export function Editor() {
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(DEFAULT_CODE[LANGUAGES[0].id] || '');
  const [isOpen, setIsOpen] = useState(false);
  
  // Execution states
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const saveMutation = useCreateSnippet();

  const handleLanguageChange = (lang: typeof LANGUAGES[0]) => {
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang.id] || '');
    setIsOpen(false);
    setOutput(null); // Clear output on language change
  };

  const handleRun = async () => {
    setIsExecuting(true);
    // 200ms pause for that "alive" loading feel
    await new Promise(r => setTimeout(r, 200));
    const result = await executeCode(code, language.id);
    setOutput(result);
    setIsExecuting(false);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col gap-6 pb-20">
      {/* Editor Header - Controls aur Branding */}
      <div className="relative z-10 flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <Code2 className="text-purple-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight uppercase">Code <span className="italic font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Sandbox</span></h2>
            <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">V1.0 — Intelligent Environment</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2.5 rounded-xl bg-slate-900/50 border border-white/10 backdrop-blur-md flex items-center gap-3 hover:border-white/20 transition-all min-w-[160px] justify-between group"
            >
              <span className="text-sm font-semibold">{language.name}</span>
              <ChevronDown size={16} className={`text-slate-500 group-hover:text-slate-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute right-0 mt-2 w-56 max-h-[400px] overflow-y-auto rounded-2xl bg-slate-900 border border-white/10 shadow-2xl backdrop-blur-3xl z-50 p-2 scrollbar-hide"
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => handleLanguageChange(lang)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-white/5 transition-all text-sm font-medium group"
                  >
                    <span className={language.id === lang.id ? 'text-purple-400' : 'text-slate-400 group-hover:text-white'}>
                      {lang.name}
                    </span>
                    {language.id === lang.id && <Check size={14} className="text-purple-400" />}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Run Button - Iska click event handleRun function call karega */}
          <button 
            onClick={handleRun}
            disabled={isExecuting}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all font-bold text-sm tracking-wider uppercase ${
              isExecuting 
              ? 'bg-slate-800 border-white/5 text-slate-600' 
              : 'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20 hover:border-green-500/40'
            }`}
          >
            {isExecuting ? <Zap size={16} className="animate-spin" /> : <Play size={16} className="fill-current" />}
            {isExecuting ? 'Running' : 'Run'}
          </button>
          
          <button 
            onClick={() => saveMutation.mutate({ title: `${language.name} Snippet`, code, language: language.id })}
            disabled={saveMutation.isPending}
            className="p-2.5 rounded-xl bg-slate-900/50 border border-white/10 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all text-slate-400 hover:text-blue-400 disabled:opacity-50"
          >
            <Save size={20} />
          </button>
        </div>
      </div>

      {/* Monaco Container - Main code editing area */}
      <div className="relative group flex-1 h-[65vh] flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex-1 rounded-[2rem] bg-[#020617]/80 border border-white/5 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="flex-1 min-h-0">
            <MonacoEditor
              height="100%"
              language={language.id}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                fontSize: 15,
                fontFamily: "'Fira Code', monospace",
                minimap: { enabled: false },
                padding: { top: 24, bottom: 24 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
                lineNumbersMinChars: 3,
                automaticLayout: true, // Yeh fix editor ko "squish" hone se bachayega
              }}
              loading={
                <div className="w-full h-full flex items-center justify-center bg-slate-950/50">
                  <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                </div>
              }
            />
          </div>

          {/* Output Panel - Yeh niche se slide-up hoga jab code run ho jaye */}
          <AnimatePresence>
            {output && (
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: 'auto', minHeight: '160px' }}
                exit={{ height: 0 }}
                className="relative z-20 bg-black/90 border-t border-white/10 backdrop-blur-3xl overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between px-6 py-3 bg-white/5">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                    <Terminal size={14} className="text-green-500" /> Output Console
                  </div>
                  <button 
                    onClick={() => setOutput(null)}
                    className="p-1 rounded-lg hover:bg-white/10 text-slate-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="flex-1 p-6 font-mono text-sm overflow-y-auto max-h-[250px] scrollbar-hide">
                  <pre className="text-slate-300 leading-relaxed whitespace-pre-wrap">{output}</pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Decorative Tips */}
      <div className="flex items-center gap-4 text-xs text-slate-500 px-2 italic">
        <Zap size={14} className="text-yellow-500/50" />
        <span>"Try writing <span className="text-slate-300 font-bold">console.log()</span> to see the results in the output console below."</span>
      </div>
    </div>
  );
}
