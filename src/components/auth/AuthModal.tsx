'use client';

import { useMemo, useState } from 'react';

import { LockKeyhole, Mail } from 'lucide-react';

import { useSitePreferences } from '@/components/preferences/SitePreferencesProvider';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import type { AuthUser } from '@/lib/types';

type AuthMode = 'login' | 'register';

interface AuthModalProps {
  open: boolean;
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onClose: () => void;
  onLogin: (payload: { email: string; password: string }) => { ok: boolean; error?: string };
  onRegister: (payload: { email: string; password: string }) => { ok: boolean; error?: string; user?: AuthUser };
}

export function AuthModal({
  open,
  mode,
  onModeChange,
  onClose,
  onLogin,
  onRegister
}: AuthModalProps) {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { t } = useSitePreferences();

  const title = useMemo(
    () => (mode === 'login' ? t('auth.loginTitle') : t('auth.registerTitle')),
    [mode, t]
  );

  const submit = () => {
    setError('');

    if (mode === 'login') {
      const result = onLogin(loginForm);
      if (!result.ok) {
        setError(result.error ?? 'Не удалось войти.');
      }
      return;
    }

    const result = onRegister(registerForm);
    if (!result.ok) {
      setError(result.error ?? 'Не удалось создать аккаунт.');
    }
  };

  const currentForm = mode === 'login' ? loginForm : registerForm;
  const setCurrentForm =
    mode === 'login'
      ? setLoginForm
      : setRegisterForm;

  return (
    <Modal open={open} onClose={onClose} title={title} className="max-w-xl">
      <div className="space-y-6">
        <div className="flex gap-2 rounded-full bg-slate-100 p-1">
          <button
            className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
              mode === 'login' ? 'bg-white text-dark shadow-soft dark:bg-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'
            }`}
            onClick={() => {
              setError('');
              onModeChange('login');
            }}
          >
            {t('auth.loginTab')}
          </button>
          <button
            className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
              mode === 'register' ? 'bg-white text-dark shadow-soft dark:bg-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'
            }`}
            onClick={() => {
              setError('');
              onModeChange('register');
            }}
          >
            {t('auth.registerTab')}
          </button>
        </div>

        <div className="rounded-[1.5rem] border border-primary/10 bg-primary/5 px-4 py-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
          {t('auth.hint')}
        </div>

        <div className="grid gap-4">
          <label className="space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            {t('auth.email')}
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                inputMode="email"
                placeholder={t('auth.emailPlaceholder')}
                className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                value={currentForm.email}
                onChange={(event) => setCurrentForm((current) => ({ ...current, email: event.target.value }))}
              />
            </div>
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            {t('auth.password')}
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                placeholder={mode === 'register' ? t('auth.passwordRegisterPlaceholder') : t('auth.passwordLoginPlaceholder')}
                className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                value={currentForm.password}
                onChange={(event) => setCurrentForm((current) => ({ ...current, password: event.target.value }))}
              />
            </div>
          </label>
        </div>

        {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div> : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button variant="ghost" onClick={onClose}>
            {t('auth.cancel')}
          </Button>
          <Button onClick={submit}>{mode === 'login' ? t('auth.loginTab') : t('auth.create')}</Button>
        </div>
      </div>
    </Modal>
  );
}
