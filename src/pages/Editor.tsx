import { useState } from 'react';
import { motion } from 'framer-motion';
import MonacoEditor from '@monaco-editor/react';
import { Code2, Play, Save, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'python', name: 'Python' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'json', name: 'JSON' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
  { id: 'csharp', name: 'C#' },
  { id: 'go', name: 'Go' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'rust', name: 'Rust' },
  { id: 'php', name: 'PHP' },
  { id: 'sql', name: 'SQL' },
  { id: 'markdown', name: 'Markdown' },
  { id: 'yaml', name: 'YAML' },
  { id: 'swift', name: 'Swift' },
  { id: 'kotlin', name: 'Kotlin' },
  { id: 'shell', name: 'Shell' },
  { id: 'dockerfile', name: 'Dockerfile' }
];

const DEFAULT_CODE: Record<string, string> = {
  javascript: "console.log('Hello, DevSignal!');",
  python: "print('Hello, DevSignal!')",
  rust: 'fn main() {\n    println!("Hello, DevSignal!");\n}',
  go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, DevSignal!")\n}',
  typescript: "const greeting: string = 'Hello, DevSignal!';\nconsole.log(greeting);"
};

export function Editor() {
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(DEFAULT_CODE[LANGUAGES[0].id] || '');
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: typeof LANGUAGES[0]) => {
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang.id] || '');
    setIsOpen(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col gap-6">
      {/* Editor Header */}
      <div className="relative z-10 flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Code2 className="text-purple-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Code <span className="italic font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Sandbox</span></h2>
            <p className="text-xs text-slate-500 font-medium tracking-wider uppercase">V1.0 — Intelligent Environment</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
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

          <button className="p-2.5 rounded-xl bg-slate-900/50 border border-white/10 hover:border-green-500/30 hover:bg-green-500/10 transition-all text-slate-400 hover:text-green-400 group">
            <Play size={20} className="group-hover:fill-current" />
          </button>
          <button className="p-2.5 rounded-xl bg-slate-900/50 border border-white/10 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all text-slate-400 hover:text-blue-400">
            <Save size={20} />
          </button>
        </div>
      </div>

      {/* Monaco Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex-1 min-h-[500px] h-[65vh] rounded-[2rem] bg-[#020617]/80 border border-white/5 backdrop-blur-xl overflow-hidden shadow-2xl group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <MonacoEditor
          height="100%"
          language={language.id}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', monospace",
            minimap: { enabled: false },
            padding: { top: 24, bottom: 24 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            lineNumbersMinChars: 3
          }}
          loading={
            <div className="w-full h-full flex items-center justify-center bg-slate-950/50">
              <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            </div>
          }
        />
      </motion.div>
    </div>
  );
}
