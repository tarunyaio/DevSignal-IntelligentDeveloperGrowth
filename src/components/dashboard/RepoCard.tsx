import { Star, GitFork, Book, ArrowRight } from 'lucide-react';
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';


interface RepoCardProps {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  lastUpdated: string;
}

export function RepoCard({ id, name, description, stars, forks, language, lastUpdated }: RepoCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="perspective-1000 h-full"
    >
      <div 
        className="neo-flat rounded-[2rem] md:rounded-[3rem] p-6 md:p-9 group relative border border-white/[0.01] flex flex-col gap-6 h-full transition-shadow duration-500 hover:shadow-2xl"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="flex justify-between items-start" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 neo-icon text-neo-accent-blue shadow-neo-accent-blue/10">
              <Book size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight text-slate-200 group-hover:text-neo-accent-blue transition-colors truncate max-w-[160px]">
                {name.includes('/') ? name.split('/')[1] : name}
              </h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{lastUpdated}</p>
            </div>
          </div>
          
          <div className="neo-pressed px-4 py-2 rounded-xl border border-white/[0.01] text-[10px] font-black tracking-widest text-neo-accent-blue uppercase" style={{ transform: "translateZ(50px)" }}>
            {language}
          </div>
        </div>

        <p className="text-sm text-slate-400 font-medium leading-[1.6] line-clamp-2" style={{ transform: "translateZ(30px)" }}>
          {description || "Repository synchronized for multi-vector analysis and structural integrity check."}
        </p>

        <div className="flex items-center gap-8 mt-auto" style={{ transform: "translateZ(45px)" }}>
          <div className="flex items-center gap-2 group-hover:text-neo-accent-blue transition-colors">
            <div className="neo-icon w-9 h-9 scale-90">
              <Star size={16} className="fill-current" />
            </div>
            <span className="text-xs font-black text-slate-300">{stars}</span>
          </div>
          
          <div className="flex items-center gap-2 group-hover:text-neo-accent-blue transition-colors">
            <div className="neo-icon w-9 h-9 scale-90">
              <GitFork size={16} />
            </div>
            <span className="text-xs font-black text-slate-300">{forks}</span>
          </div>

          <Link 
            to={`/repo/${id}`} 
            className="ml-auto w-12 h-12 neo-icon hover:neo-icon-pressed text-slate-500 hover:text-neo-accent-blue transition-all border border-white/[0.01]"
          >
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
