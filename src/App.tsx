import { Github, BarChart3, BookOpen, Code2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4">
          <Github size={40} />
        </div>
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          DevSignal
        </h1>
        <p className="text-lg text-slate-400 max-w-lg mx-auto">
          A GitHub-native developer intelligence layer that turns activity into actionable growth.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 text-left">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors">
            <BarChart3 className="text-blue-400 mb-3" />
            <h3 className="font-semibold mb-1">Analytics</h3>
            <p className="text-sm text-slate-400">Structured insights from your repositories.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors">
            <BookOpen className="text-blue-400 mb-3" />
            <h3 className="font-semibold mb-1">Resources</h3>
            <p className="text-sm text-slate-400">Organized learning tailored to your work.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors">
            <Code2 className="text-blue-400 mb-3" />
            <h3 className="font-semibold mb-1">Code Editor</h3>
            <p className="text-sm text-slate-400">Lightweight execution for quick snippets.</p>
          </div>
        </div>

        <div className="pt-8">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 font-semibold rounded-full transition-all shadow-lg shadow-blue-600/20">
            Login with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
