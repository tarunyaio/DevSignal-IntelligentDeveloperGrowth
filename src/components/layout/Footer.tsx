import { Shield, Lock, Cpu, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { footerLinks } from '@/lib/footerLinks';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="relative mt-auto pt-24 pb-32 md:pt-32 md:pb-36 overflow-hidden border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Top row: brand + links + status */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* Brand */}
          <div className="md:col-span-5 flex items-center gap-4 justify-center md:justify-start text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
              <Terminal size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-text leading-none">
                DevSignal{' '}
                <span className="text-primary text-base font-medium ml-1 bg-primary/10 px-2 py-0.5 rounded-md">
                  v2.1
                </span>
              </h2>
              <p className="text-sm text-text-muted mt-2">
                Intelligent Developer Growth Engine
              </p>
            </div>
          </div>

          {/* Links */}
          <nav className="md:col-span-4 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 self-center">
            {footerLinks.map((link) =>
              link.internal ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    'text-sm font-medium text-text-muted hover:text-primary transition-colors',
                    link.italic && 'italic'
                  )}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'text-sm font-medium text-text-muted hover:text-primary transition-colors',
                    link.italic && 'italic'
                  )}
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Status badges */}
          <div className="md:col-span-3 flex flex-wrap justify-center md:justify-end gap-3 self-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface-hover">
              <Shield size={14} className="text-emerald-500" />
              <span className="text-xs font-medium text-text-muted">
                Secured
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface-hover">
              <Lock size={14} className="text-primary" />
              <span className="text-xs font-medium text-text-muted">
                Encrypted
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-text-muted">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span>© 2026 DevSignal Systems</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>All rights reserved.</span>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Cpu size={14} />
            <span>System Status: Optimal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
