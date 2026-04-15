import React from 'react';

interface Contributor {
  login: string;
  avatar_url: string;
  contributions: number;
  html_url: string;
}

interface ContributorGridProps {
  contributors?: Contributor[];
}

export function ContributorGrid({ contributors }: ContributorGridProps) {
  if (!contributors || contributors.length === 0) {
    return (
      <div className="text-slate-500 text-sm italic">
        No contributor data available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      {contributors.slice(0, 15).map((contributor) => (
        <a
          key={contributor.login}
          href={contributor.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center gap-2"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover:border-purple-400 group-hover:scale-110 transition-all duration-300">
            <img 
              src={contributor.avatar_url} 
              alt={contributor.login}
              className="w-full h-full object-cover"
            />
            {/* Hover overlay with contribution count */}
            <div className="absolute inset-0 bg-purple-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-black text-white">{contributor.contributions}</span>
            </div>
          </div>
          <span className="text-[8px] font-black uppercase text-slate-500 truncate w-full text-center group-hover:text-white transition-colors">
            {contributor.login}
          </span>
        </a>
      ))}
      {contributors.length > 15 && (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400">
          +{contributors.length - 15}
        </div>
      )}
    </div>
  );
}
