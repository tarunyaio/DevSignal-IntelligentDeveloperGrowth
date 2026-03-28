import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  BookOpen, 
  Code2,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { icon: LayoutDashboard, label: 'Home', href: '/dashboard' },
  { icon: BarChart3, label: 'Stats', href: '/analytics' },
  { icon: BookOpen, label: 'Docs', href: '/resources' },
  { icon: Code2, label: 'Code', href: '/editor' },
];

export function BottomNav() {
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center px-4 z-50 pointer-events-none">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.5 }}
        className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 px-4 py-2 flex items-center gap-2 rounded-full shadow-2xl pointer-events-auto"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => cn(
              "relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group",
              isActive ? "text-white" : "text-slate-400 hover:text-white"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <item.icon size={20} className="relative z-10 group-hover:scale-110 transition-transform" />
                
                {/* Tooltip on hover */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/5">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
        
        <div className="w-px h-6 bg-white/10 mx-2" />
        
        <button className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center p-[1px] hover:scale-105 transition-transform group relative">
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
             <User size={18} className="text-white" />
          </div>
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/5">
            Profile
          </span>
        </button>
      </motion.nav>
    </div>
  );
}
