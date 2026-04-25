'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { getMessage, localeStorageKey, localeOptions, themeStorageKey } from '@/lib/i18n';
import type { Locale, ThemeMode } from '@/lib/i18n';

interface SitePreferencesContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  t: (path: string) => string;
}

const SitePreferencesContext = createContext<SitePreferencesContextValue | null>(null);

const isLocale = (value: string | null): value is Locale =>
  localeOptions.some((option) => option.value === value);

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ru');
  const [theme, setThemeState] = useState<ThemeMode>('light');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedLocale = window.localStorage.getItem(localeStorageKey);
    const storedTheme = window.localStorage.getItem(themeStorageKey);

    if (isLocale(storedLocale)) {
      setLocaleState(storedLocale);
    }

    if (storedTheme === 'light' || storedTheme === 'dark') {
      setThemeState(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(localeStorageKey, locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  const value = useMemo<SitePreferencesContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      theme,
      setTheme: setThemeState,
      toggleTheme: () => setThemeState((current) => (current === 'dark' ? 'light' : 'dark')),
      t: (path: string) => getMessage(locale, path)
    }),
    [locale, theme]
  );

  return <SitePreferencesContext.Provider value={value}>{children}</SitePreferencesContext.Provider>;
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext);

  if (!context) {
    throw new Error('useSitePreferences must be used within SitePreferencesProvider');
  }

  return context;
}
