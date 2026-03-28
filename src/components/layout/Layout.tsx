import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-purple-500/30">
      <Header />
      
      <main className="flex-1 p-4 md:p-8 pb-32">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}
