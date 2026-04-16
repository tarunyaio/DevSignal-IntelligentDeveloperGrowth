import { Bell, Search, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';


export function Header() {
  const { user, logout } = useAuth();
  const avatarUrl = user?.user_metadata?.avatar_url;
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.user_name || 'User';

  return (
    <header className="h-20 md:h-24 bg-neo-bg flex items-center justify-between px-6 md:px-10 sticky top-0 z-40 border-b border-white/[0.01]">
      <div className="flex items-center gap-8 flex-1">
        <div className="relative w-full max-w-md hidden sm:block">
          <div className="neo-pressed rounded-full flex items-center px-6 py-2.5 border border-white/[0.01] group focus-within:ring-2 ring-neo-accent-blue/20 transition-all">
            <Search className="text-slate-500 mr-4 group-focus-within:text-neo-accent-blue transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search repositories..." 
              className="bg-transparent border-none text-sm focus:outline-none w-full text-slate-200 placeholder:text-slate-600 font-bold uppercase tracking-widest"
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 md:gap-6">
        <button className="w-10 h-10 md:w-12 md:h-12 neo-icon group">
          <Bell size={18} className="md:size-[20px] text-slate-500 group-hover:text-neo-accent-blue transition-colors" />
        </button>
        
        <div className="h-10 w-px bg-white/[0.03] mx-3" />
        
        <div className="flex items-center gap-3 md:gap-4 pr-2 md:pr-3">
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hidden md:inline">{displayName}</span>
           {avatarUrl ? (
             <div className="w-9 h-9 md:w-11 md:h-11 neo-icon p-[2px] md:p-[3px]">
               <img src={avatarUrl} alt={displayName} className="w-full h-full rounded-full object-cover" />
             </div>
           ) : (
             <div className="w-11 h-11 neo-icon text-xs font-black text-neo-accent-blue">
               {displayName.charAt(0).toUpperCase()}
             </div>
           )}
        </div>

        <button 
          onClick={logout}
          className="w-10 h-10 md:w-12 md:h-12 neo-icon group border border-white/[0.01]"
          title="Logout"
        >
          <LogOut size={16} className="md:size-[18px] text-slate-500 group-hover:text-neo-accent-orange transition-colors" />
        </button>
      </div>
    </header>
  );
}
