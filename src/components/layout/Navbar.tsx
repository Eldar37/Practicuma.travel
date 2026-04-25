'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';

import { useAuth } from '@/components/auth/AuthProvider';
import { Logo } from '@/components/layout/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { PreferenceControls } from '@/components/layout/PreferenceControls';
import { useSitePreferences } from '@/components/preferences/SitePreferencesProvider';
import { Button, buttonStyles } from '@/components/ui/Button';
import { PARTNER_TELEGRAM_URL } from '@/lib/contacts';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { hydrated, openAuth, logout, user } = useAuth();
  const { t } = useSitePreferences();

  const links = [
    { href: '/tours', label: t('nav.tours') },
    { href: '/map', label: t('nav.map') },
    { href: '/content', label: t('nav.content') },
    { href: '/about', label: t('nav.about') }
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHomeTop = pathname === '/' && !scrolled;
  const navTextColor = isHomeTop ? 'text-white' : 'text-slate-700';

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          isHomeTop ? 'bg-transparent' : 'bg-white/88 shadow-soft backdrop-blur-xl'
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo colorClassName={isHomeTop ? 'text-white' : 'text-dark'} />
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn('relative py-2 text-sm font-semibold transition', navTextColor, isActive && 'text-primary')}
                >
                  {link.label}
                  <AnimatePresence>
                    {isActive ? (
                      <motion.span
                        className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-primary"
                        layoutId="navbar-underline"
                      />
                    ) : null}
                  </AnimatePresence>
                </Link>
              );
            })}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <PreferenceControls inverse={isHomeTop} />
            {hydrated && user ? (
              <>
                <Link
                  href="/account"
                  className={buttonStyles({
                    variant: isHomeTop ? 'outline' : 'ghost',
                    size: 'md'
                  })}
                >
                  {user.name}
                </Link>
                <Button variant={isHomeTop ? 'secondary' : 'primary'} onClick={logout}>
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <>
                <button
                  className={buttonStyles({
                    variant: isHomeTop ? 'outline' : 'ghost',
                    size: 'md'
                  })}
                  onClick={() => openAuth('login')}
                >
                  {t('nav.login')}
                </button>
                <a
                  href={PARTNER_TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonStyles({ variant: isHomeTop ? 'secondary' : 'primary', size: 'md' })}
                >
                  {t('nav.partner')}
                </a>
              </>
            )}
          </div>
          <button
            aria-label={t('nav.menu')}
            className={cn(
              'rounded-full border p-2 transition lg:hidden',
              isHomeTop ? 'border-white/50 text-white' : 'border-slate-200 text-slate-700'
            )}
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} setOpen={setMenuOpen} links={links} />
    </>
  );
}
