import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  ExternalLink, 
  Clock, 
  Trophy,
  Play,
  Book,
  Code2,
  Layout
} from 'lucide-react';
import { LEARNING_PATHS } from '../data/learningPaths';

const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'video': return <Play size={18} />;
    case 'docs': return <Book size={18} />;
    case 'course': return <Layout size={18} />;
    case 'project': return <Code2 size={18} />;
    default: return <ExternalLink size={18} />;
  }
};

export const LearningPathPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const path = LEARNING_PATHS.find(p => p.id === courseId);
  
  const [completedLevels, setCompletedLevels] = useState<number[]>(() => {
    if (!courseId) return [];
    const saved = localStorage.getItem(`progress_${courseId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const toggleLevel = (level: number) => {
    const updated = completedLevels.includes(level)
      ? completedLevels.filter(l => l !== level)
      : [...completedLevels, level];
    
    setCompletedLevels(updated);
    if (courseId) {
      localStorage.setItem(`progress_${courseId}`, JSON.stringify(updated));
    }
  };

  if (!path) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Path not found</h2>
          <button 
            onClick={() => navigate('/resources')}
            className="px-6 py-2 neo-flat rounded-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const progress = (completedLevels.length / path.levels.length) * 100;
  const Icon = path.icon;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pb-20">
      {/* Header Section */}
      <div className="sticky top-0 z-40 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => navigate('/resources')}
              className="p-2 rounded-xl neo-flat hover:neo-pressed transition-all text-white/60 hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Your Progress</p>
                <p className="text-sm font-bold text-blue-400">{completedLevels.length}/{path.levels.length} Levels</p>
              </div>
              <div className="w-12 h-12 rounded-full neo-flat flex items-center justify-center relative">
                 <svg className="w-10 h-10 transform -rotate-90">
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    className="text-white/5"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 18}
                    strokeDashoffset={2 * Math.PI * 18 * (1 - progress / 100)}
                    className="text-blue-400 transition-all duration-1000"
                  />
                </svg>
                {completedLevels.length === path.levels.length && (
                  <Trophy size={16} className="absolute text-yellow-400" />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div 
              className="p-5 rounded-2xl neo-icon shrink-0"
              style={{ color: path.accentColor }}
            >
              <Icon size={40} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {path.category}
                </span>
                <span className="text-xs text-white/40">{path.difficulty}</span>
              </div>
              <h1 className="text-4xl font-black text-white mb-2">{path.title}</h1>
              <p className="text-lg text-white/60 max-w-2xl">{path.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-4xl mx-auto px-6 mt-12">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-white/5" />

          <div className="space-y-12">
            {path.levels.map((level, index) => {
              const isCompleted = completedLevels.includes(level.level);
              const isNext = index === 0 || completedLevels.includes(path.levels[index-1].level);
              
              return (
                <div 
                  key={level.level}
                  className={`relative pl-16 transition-all duration-500 ${!isNext && !isCompleted ? 'opacity-40 grayscale' : ''}`}
                >
                  {/* Level Marker */}
                  <div 
                    onClick={() => toggleLevel(level.level)}
                    className={`absolute left-0 top-1 w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 z-10 ${
                      isCompleted 
                      ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]' 
                      : 'neo-flat text-white/40 hover:text-white'
                    }`}
                  >
                    {isCompleted ? <CheckCircle size={24} /> : <span className="font-bold">{level.level}</span>}
                  </div>

                  <div className={`p-8 rounded-3xl transition-all duration-300 ${isCompleted ? 'bg-white/[0.02] border border-white/5' : 'neo-flat hover:bg-white/[0.02]'}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Level {level.level}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <div className="flex items-center gap-1.5 text-xs text-blue-400/80 font-medium">
                            <TypeIcon type={level.type} />
                            <span className="capitalize">{level.type}</span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{level.title}</h3>
                        <p className="text-white/50 mb-6 leading-relaxed">
                          {level.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/20 border border-white/5 text-xs text-white/60">
                            <Clock size={14} />
                            <span>{level.estimatedTime}</span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/20 border border-white/5 text-xs text-white/60">
                            <Layout size={14} />
                            <span>{level.platform}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 min-w-[200px]">
                        <a 
                          href={level.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-center flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                        >
                          Explore Resource
                          <ExternalLink size={18} />
                        </a>
                        <button 
                          onClick={() => toggleLevel(level.level)}
                          className={`w-full py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                            isCompleted 
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20' 
                            : 'neo-flat hover:neo-pressed text-white/60'
                          }`}
                        >
                          {isCompleted ? 'Marked as Complete' : 'Mark as Done'}
                          {isCompleted && <CheckCircle size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion Card */}
        {completedLevels.length === path.levels.length && (
          <div className="mt-20 p-12 rounded-[40px] neo-flat text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(250,204,21,0.4)]">
                <Trophy size={40} className="text-[#0f172a]" />
              </div>
              <h2 className="text-3xl font-black text-white mb-4">Path Mastery Achieved!</h2>
              <p className="text-white/60 max-w-md mx-auto mb-8">
                You've completed all 10 levels of the {path.title} archive. Your knowledge is now significantly more structured and deep.
              </p>
              <button 
                onClick={() => navigate('/resources')}
                className="px-10 py-4 rounded-2xl bg-white text-[#0f172a] font-black hover:scale-105 transition-transform active:scale-95"
              >
                Explore More Archives
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
