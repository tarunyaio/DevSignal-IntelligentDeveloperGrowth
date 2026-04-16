import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="relative min-h-screen bg-neo-bg text-slate-200 font-sans selection:bg-neo-accent-blue/30 overflow-x-hidden">
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 p-5 md:p-10 pb-28 md:pb-16 transition-all duration-500">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        <Footer />
        
        <BottomNav />
      </div>
    </div>
  );
}
