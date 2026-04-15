import { Bell, Search, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export function Header() {
  const { user, logout } = useAuth();
  const avatarUrl = user?.user_metadata?.avatar_url;
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.user_name || 'User';

  return (
    <header className="h-20 bg-neo-bg flex items-center justify-between px-8 sticky top-0 z-40 border-b border-white/[0.02]">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-full max-w-sm hidden sm:block">
          <div className="neo-pressed rounded-full flex items-center px-4 py-1.5 border border-white/[0.01]">
            <Search className="text-slate-500 mr-3" size={16} />
            <input 
              type="text" 
              placeholder="Search intelligence..." 
              className="bg-transparent border-none text-sm focus:outline-none w-full text-slate-300 placeholder:text-slate-600 font-medium"
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 neo-icon group">
          <Bell size={18} className="text-slate-500 group-hover:text-neo-accent-blue transition-colors" />
        </button>
        
        <div className="h-8 w-px bg-white/[0.05] mx-2" />
        
        <div className="flex items-center gap-3 pr-2">
           <span className="text-xs font-bold uppercase tracking-widest text-slate-500 hidden md:inline">{displayName}</span>
           {avatarUrl ? (
             <div className="w-9 h-9 neo-icon p-[2px]">
               <img src={avatarUrl} alt={displayName} className="w-full h-full rounded-full object-cover" />
             </div>
           ) : (
             <div className="w-9 h-9 neo-icon text-[10px] font-black text-neo-accent-blue">
               {displayName.charAt(0).toUpperCase()}
             </div>
           )}
        </div>

        <button 
          onClick={logout}
          className="w-10 h-10 neo-icon group"
          title="Logout"
        >
          <LogOut size={16} className="text-slate-500 group-hover:text-neo-accent-orange transition-colors" />
        </button>
      </div>
    </header>
  );
}
