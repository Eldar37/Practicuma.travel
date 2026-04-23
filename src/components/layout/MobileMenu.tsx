'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Dispatch, SetStateAction } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

import { useAuth } from '@/components/auth/AuthProvider';
import { Logo } from '@/components/layout/Logo';
import { Button, buttonStyles } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  links: Array<{ href: string; label: string }>;
}

export function MobileMenu({ open, setOpen, links }: MobileMenuProps) {
  const pathname = usePathname();
  const { hydrated, logout, openAuth, user } = useAuth();

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            aria-label="Закрыть мобильное меню"
            className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-2xl lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div className="mb-10 flex items-center justify-between">
              <Logo colorClassName="text-dark" className="gap-2" />
              <button
                aria-label="Закрыть меню"
                className="rounded-full border border-slate-200 p-2 text-slate-600"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-2">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'rounded-2xl px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-100',
                      isActive && 'bg-primary/10 text-primary'
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="space-y-3">
              {hydrated && user ? (
                <>
                  <Link href="/account" className={buttonStyles({ variant: 'ghost', size: 'lg', fullWidth: true })} onClick={() => setOpen(false)}>
                    {user.name}
                  </Link>
                  <Button
                    fullWidth
                    size="lg"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                  >
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <button
                    className={buttonStyles({ variant: 'ghost', size: 'lg', fullWidth: true })}
                    onClick={() => {
                      setOpen(false);
                      openAuth('login');
                    }}
                  >
                    Войти
                  </button>
                  <Link href="/partners" className={buttonStyles({ variant: 'primary', size: 'lg', fullWidth: true })} onClick={() => setOpen(false)}>
                    Стать партнёром
                  </Link>
                </>
              )}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
