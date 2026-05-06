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
    title: 'System Sync Complete',
    description: 'Successfully mapped 12 new repositories to your DevSignal profile.',
    time: '2m ago',
    isRead: false,
    type: 'system'
  },
  {
    id: '2',
    title: 'Pull Request Merged',
    description: 'Your PR #42 in tarunyaio/DevSignal was merged into main.',
    time: '1h ago',
    isRead: false,
    type: 'github'
  },
  {
    id: '3',
    title: 'New Star Received',
    description: 'tarunyaio/Photon gained a new star.',
    time: '3h ago',
    isRead: true,
    type: 'success'
  },
  {
    id: '4',
    title: 'Anomaly Detected',
    description: 'High iteration depth noticed in local branch. Consider pushing.',
    time: '1d ago',
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
          "w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all relative z-50",
          isOpen ? "bg-surface-hover text-text" : "hover:bg-surface-hover bg-surface text-text-muted hover:text-text"
        )}
      >
        <motion.div
          animate={unreadCount > 0 ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5, delay: 2, repeat: Infinity, repeatDelay: 5 }}
        >
          <Bell size={18} strokeWidth={2} />
        </motion.div>
        
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
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
            className="absolute top-full right-0 mt-3 w-[360px] glass-panel shadow-lg z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-surface/50">
              <h3 className="font-semibold text-text flex items-center gap-2">
                <Activity size={16} className="text-primary" />
                Activity Log
              </h3>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllRead}
                  className="text-xs font-medium text-text-muted hover:text-primary transition-all"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-[360px] overflow-y-auto no-scrollbar bg-bg/50">
              {notifications.length > 0 ? (
                <div className="flex flex-col">
                  {notifications.map((notif, index) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => markAsRead(notif.id)}
                      className={cn(
                        "group cursor-pointer p-5 border-b border-border last:border-b-0 hover:bg-surface-hover transition-colors relative overflow-hidden",
                        notif.isRead ? "opacity-70" : "bg-primary/5 hover:bg-primary/10"
                      )}
                    >
                      <div className="relative z-10 flex gap-4">
                        <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center transition-all">
                          {getIcon(notif.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={cn(
                              "font-semibold text-sm transition-colors",
                              !notif.isRead ? "text-text" : "text-text-muted"
                            )}>
                              {notif.title}
                            </h4>
                            <span className="text-[10px] font-medium text-text-muted/60 group-hover:text-text-muted transition-colors">
                              {notif.time}
                            </span>
                          </div>
                          <p className="text-xs text-text-muted leading-relaxed">
                            {notif.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Unread dot */}
                      {!notif.isRead && (
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-10 text-center flex flex-col items-center justify-center text-text-muted">
                  <CheckCircle2 size={32} className="mb-3 opacity-20" />
                  <p className="font-medium text-sm">You're all caught up!</p>
                  <p className="text-xs mt-1 opacity-70">No new notifications.</p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-3 border-t border-border bg-surface/50 text-center">
              <button className="text-xs font-medium text-primary hover:text-primary-hover transition-colors">
                View Full Archive
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
