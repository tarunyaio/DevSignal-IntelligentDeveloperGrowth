import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Terminal, GitMerge, Star, Activity, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  type: 'system' | 'github' | 'alert' | 'success';
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'System_Sync_Complete',
    description: 'Successfully mapped 12 new repositories to your DevSignal profile.',
    time: '2M_AGO',
    isRead: false,
    type: 'system'
  },
  {
    id: '2',
    title: 'Pull_Request_Merged',
    description: 'Your PR #42 in tarunyaio/DevSignal was merged into main.',
    time: '1H_AGO',
    isRead: false,
    type: 'github'
  },
  {
    id: '3',
    title: 'New_Star_Received',
    description: 'tarunyaio/Photon gained a new star.',
    time: '3H_AGO',
    isRead: true,
    type: 'success'
  },
  {
    id: '4',
    title: 'Anomaly_Detected',
    description: 'High iteration depth noticed in local branch. Consider pushing.',
    time: '1D_AGO',
    isRead: true,
    type: 'alert'
  }
];

export function NotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const panelRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'system': return <Terminal size={16} className="text-emerald-500" />;
      case 'github': return <GitMerge size={16} className="text-violet-500" />;
      case 'success': return <Star size={16} className="text-amber-500" />;
      case 'alert': return <Activity size={16} className="text-rose-500" />;
      default: return <Bell size={16} />;
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-12 h-12 border-2 border-black flex items-center justify-center transition-all relative z-50",
          isOpen ? "bg-black text-white" : "hover:bg-black hover:text-white bg-white text-black"
        )}
      >
        <motion.div
          animate={unreadCount > 0 ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5, delay: 2, repeat: Infinity, repeatDelay: 5 }}
        >
          <Bell size={20} strokeWidth={3} />
        </motion.div>
        
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-yellow-400 border-2 border-black" />
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, pointerEvents: 'none' }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-0 mt-4 w-[380px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50"
          >
            {/* Header */}
            <div className="p-6 border-b-4 border-black flex items-center justify-between bg-zinc-50">
              <h3 className="font-black uppercase tracking-tighter text-xl italic flex items-center gap-3">
                <Activity size={20} className="text-accent-indigo" />
                ACTIVITY_LOG
              </h3>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllRead}
                  className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-black hover:underline transition-all"
                >
                  MARK_ALL_READ
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto no-scrollbar bg-white">
              {notifications.length > 0 ? (
                <div className="flex flex-col">
                  {notifications.map((notif, index) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => markAsRead(notif.id)}
                      className={cn(
                        "group cursor-pointer p-6 border-b-2 border-black last:border-b-0 hover:bg-black transition-colors relative overflow-hidden",
                        notif.isRead ? "opacity-70" : ""
                      )}
                    >
                      <div className="relative z-10 flex gap-4">
                        <div className="mt-1 flex-shrink-0 w-8 h-8 border-2 border-black bg-white flex items-center justify-center group-hover:border-transparent group-hover:bg-zinc-800 transition-all">
                          {getIcon(notif.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={cn(
                              "font-black text-xs uppercase tracking-widest transition-colors",
                              "group-hover:text-white",
                              !notif.isRead ? "text-black" : "text-zinc-600"
                            )}>
                              {notif.title}
                            </h4>
                            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest group-hover:text-zinc-500">
                              {notif.time}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 font-bold group-hover:text-zinc-400">
                            {notif.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Unread dot */}
                      {!notif.isRead && (
                        <div className="absolute top-1/2 -translate-y-1/2 right-6 w-2 h-2 bg-yellow-400 border border-black rounded-full" />
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center flex flex-col items-center justify-center text-zinc-400">
                  <CheckCircle2 size={32} className="mb-4 opacity-20" />
                  <p className="font-black text-xs uppercase tracking-widest">SYSTEM_CLEAR</p>
                  <p className="text-[10px] font-bold mt-2 tracking-widest">NO NEW LOGS FOUND.</p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t-4 border-black bg-zinc-50 text-center">
              <button className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-indigo hover:text-black transition-colors underline decoration-2 underline-offset-4">
                VIEW_FULL_ARCHIVE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
