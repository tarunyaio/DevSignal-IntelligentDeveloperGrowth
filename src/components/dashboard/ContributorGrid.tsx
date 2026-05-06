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
      <div className="text-text-muted text-sm font-medium italic text-center py-6">
        No contributor data available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-6">
      {contributors.slice(0, 15).map((contributor) => (
        <a
          key={contributor.login}
          href={contributor.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center gap-3"
        >
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-surface shadow-sm group-hover:border-primary group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
            <img 
              src={contributor.avatar_url} 
              alt={contributor.login}
              className="w-full h-full object-cover"
            />
            {/* Hover overlay with contribution count */}
            <div className="absolute inset-0 bg-primary/80 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-semibold text-white">{contributor.contributions}</span>
            </div>
          </div>
          <span className="text-xs font-medium text-text-muted truncate w-full text-center group-hover:text-primary transition-colors">
            {contributor.login}
          </span>
        </a>
      ))}
      {contributors.length > 15 && (
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-surface-hover border border-border text-xs font-semibold text-text-muted shadow-inner">
            +{contributors.length - 15}
          </div>
          <span className="text-xs font-medium text-text-muted truncate w-full text-center">
            More
          </span>
        </div>
      )}
    </div>
  );
}
