import React from 'react';
import { Star, GitFork, Book, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
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

// Yeh component ek single repository ko "alive" and interactive tareeke se highlight karta hai
export function RepoCard({ id, name, description, stars, forks, language, lastUpdated }: RepoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.01 }}
      viewport={{ once: true }}
      className="group relative p-0.5 rounded-[2.2rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 hover:from-purple-500/40 hover:to-blue-500/40 transition-all duration-500 shadow-2xl overflow-hidden"
    >
      <div className="relative rounded-[2rem] bg-[#0d0425]/90 backdrop-blur-3xl p-6 h-full flex flex-col gap-4">
        {/* Header - Icon aur Name */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Book size={20} />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors uppercase truncate max-w-[200px]">
              {name}
            </h3>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            <Clock size={12} />
            {lastUpdated}
          </div>
        </div>

        {/* Description - Agar description bohot badi hai toh truncate kar do */}
        <p className="text-sm text-slate-400 line-clamp-2 min-h-[40px] leading-relaxed">
          {description || "No description provided for this amazing project yet."}
        </p>

        {/* Stats - Stars, Forks, Language */}
        <div className="flex items-center gap-4 mt-auto">
          <div className="flex items-center gap-1.5 text-slate-500 group-hover:text-yellow-500/80 transition-colors">
            <Star size={16} />
            <span className="text-xs font-bold">{stars}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 group-hover:text-blue-500/80 transition-colors">
            <GitFork size={16} />
            <span className="text-xs font-bold">{forks}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-300">{language}</span>
          </div>
        </div>

        {/* Hover Action - "Explore" button jo hover par slide in hota hai */}
        <Link to={`/repo/${id}`} className="absolute bottom-4 right-4 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-wider">
            Explore <ArrowRight size={14} />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
