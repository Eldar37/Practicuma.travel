'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { AuthModal } from '@/components/auth/AuthModal';
import { emailDomainAllowed, getMessage, localeStorageKey } from '@/lib/i18n';
import type { AuthStoredUser, AuthUser } from '@/lib/types';

type AuthMode = 'login' | 'register';

interface AuthContextValue {
  user: AuthUser | null;
  hydrated: boolean;
  openAuth: (mode?: AuthMode, onSuccess?: () => void) => void;
  closeAuth: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const USERS_KEY = 'practicuma-auth-users';
const CURRENT_KEY = 'practicuma-auth-current';

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const getCurrentLocale = () => {
  if (typeof window === 'undefined') {
    return 'ru' as const;
  }

  const storedLocale = window.localStorage.getItem(localeStorageKey);
  return storedLocale === 'ky' || storedLocale === 'en' ? storedLocale : 'ru';
};

const buildDisplayName = (email: string) => {
  const [localPart] = normalizeEmail(email).split('@');

  return (
    localPart
      ?.split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ') || 'Traveler'
  );
};

const readUsers = () => {
  if (typeof window === 'undefined') {
    return [] as AuthStoredUser[];
  }

  const raw = window.localStorage.getItem(USERS_KEY);
  return raw ? (JSON.parse(raw) as AuthStoredUser[]) : [];
};

const writeUsers = (users: AuthStoredUser[]) => {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const successCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(CURRENT_KEY);
    if (raw) {
      setUser(JSON.parse(raw) as AuthUser);
    }
    setHydrated(true);
  }, []);

  const persistCurrentUser = useCallback((nextUser: AuthUser | null) => {
    if (!nextUser) {
      window.localStorage.removeItem(CURRENT_KEY);
      setUser(null);
      return;
    }

    window.localStorage.setItem(CURRENT_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }, []);

  const closeAuth = useCallback(() => {
    setOpen(false);
    successCallback.current = null;
  }, []);

  const openAuth = useCallback((nextMode: AuthMode = 'login', onSuccess?: () => void) => {
    setMode(nextMode);
    setOpen(true);
    successCallback.current = onSuccess ?? null;
  }, []);

  const completeAuth = useCallback(
    (nextUser: AuthUser) => {
      persistCurrentUser(nextUser);
      setOpen(false);
      successCallback.current?.();
      successCallback.current = null;
    },
    [persistCurrentUser]
  );

  const logout = useCallback(() => {
    persistCurrentUser(null);
  }, [persistCurrentUser]);

  const login = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      const normalizedEmail = normalizeEmail(email);

      if (!normalizedEmail || !password.trim()) {
        return {
          ok: false,
          error: getMessage(getCurrentLocale(), 'auth.missingCredentials')
        };
      }

      if (!emailDomainAllowed(normalizedEmail)) {
        return {
          ok: false,
          error: getMessage(getCurrentLocale(), 'auth.unsupportedDomain')
        };
      }

      const foundUser = readUsers().find(
        (entry) => normalizeEmail(entry.email) === normalizedEmail && entry.password === password
      );

      if (!foundUser) {
        return {
          ok: false,
          error: getMessage(getCurrentLocale(), 'auth.invalidCredentials')
        };
      }

      const { password: _password, ...safeUser } = foundUser;
      void _password;
      completeAuth(safeUser);
      return { ok: true };
    },
    [completeAuth]
  );

  const register = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      const normalizedEmail = normalizeEmail(email);

      if (!normalizedEmail || !password.trim()) {
        return { ok: false, error: getMessage(getCurrentLocale(), 'auth.missingCredentials') };
      }

      if (!emailDomainAllowed(normalizedEmail)) {
        return { ok: false, error: getMessage(getCurrentLocale(), 'auth.registerDomain') };
      }

      if (password.trim().length < 6) {
        return { ok: false, error: getMessage(getCurrentLocale(), 'auth.shortPassword') };
      }

      const users = readUsers();
      const exists = users.some((entry) => normalizeEmail(entry.email) === normalizedEmail);

      if (exists) {
        return { ok: false, error: getMessage(getCurrentLocale(), 'auth.duplicateUser') };
      }

      const nextUser: AuthStoredUser = {
        id: `user-${Date.now()}`,
        name: buildDisplayName(normalizedEmail),
        email: normalizedEmail,
        password,
        role: 'traveler',
        createdAt: new Date().toISOString()
      };

      writeUsers([...users, nextUser]);
      const { password: _password, ...safeUser } = nextUser;
      void _password;
      completeAuth(safeUser);

      return { ok: true, user: safeUser };
    },
    [completeAuth]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      hydrated,
      openAuth,
      closeAuth,
      logout
    }),
    [closeAuth, hydrated, logout, openAuth, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal
        open={open}
        mode={mode}
        onModeChange={setMode}
        onClose={closeAuth}
        onLogin={login}
        onRegister={register}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
