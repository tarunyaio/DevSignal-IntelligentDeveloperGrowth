import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  BookOpen, 
  Code2 
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Home', href: '/dashboard' },
  { icon: BarChart3, label: 'Stats', href: '/analytics' },
  { icon: BookOpen, label: 'Docs', href: '/resources' },
  { icon: Code2, label: 'Code', href: '/editor' },
];

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-lg border-t border-white/10 px-4 py-2 flex justify-around items-center z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) => cn(
            "flex flex-col items-center gap-1 p-2 transition-all duration-200",
            isActive ? "text-blue-400 scale-105" : "text-slate-500"
          )}
        >
          <item.icon size={20} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
