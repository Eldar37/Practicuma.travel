'use client';

import { useMemo, useState } from 'react';

import { LockKeyhole, Mail, Phone, UserRound } from 'lucide-react';

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
  onRegister: (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => { ok: boolean; error?: string; user?: AuthUser };
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
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');

  const title = useMemo(() => (mode === 'login' ? 'Авторизация' : 'Регистрация'), [mode]);

  const submit = () => {
    if (mode === 'login') {
      const result = onLogin(loginForm);
      if (!result.ok) {
        setError(result.error ?? 'Не удалось войти');
      }
      return;
    }

    const result = onRegister(registerForm);
    if (!result.ok) {
      setError(result.error ?? 'Не удалось зарегистрироваться');
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={title} className="max-w-2xl">
      <div className="space-y-6">
        <div className="flex gap-2 rounded-full bg-slate-100 p-1">
          <button
            className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
              mode === 'login' ? 'bg-white text-dark shadow-soft' : 'text-slate-500'
            }`}
            onClick={() => {
              setError('');
              onModeChange('login');
            }}
          >
            Войти
          </button>
          <button
            className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
              mode === 'register' ? 'bg-white text-dark shadow-soft' : 'text-slate-500'
            }`}
            onClick={() => {
              setError('');
              onModeChange('register');
            }}
          >
            Регистрация
          </button>
        </div>

        {mode === 'login' ? (
          <div className="grid gap-4">
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Email
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4"
                  value={loginForm.email}
                  onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                />
              </div>
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Пароль
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4"
                  value={loginForm.password}
                  onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                />
              </div>
            </label>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-slate-700 sm:col-span-2">
              Имя
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4"
                  value={registerForm.name}
                  onChange={(event) => setRegisterForm((current) => ({ ...current, name: event.target.value }))}
                />
              </div>
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Email
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4"
                  value={registerForm.email}
                  onChange={(event) => setRegisterForm((current) => ({ ...current, email: event.target.value }))}
                />
              </div>
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Телефон
              <div className="relative">
                <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4"
                  value={registerForm.phone}
                  onChange={(event) => setRegisterForm((current) => ({ ...current, phone: event.target.value }))}
                />
              </div>
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700 sm:col-span-2">
              Пароль
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4"
                  value={registerForm.password}
                  onChange={(event) => setRegisterForm((current) => ({ ...current, password: event.target.value }))}
                />
              </div>
            </label>
          </div>
        )}

        {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div> : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button variant="ghost" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={submit}>{mode === 'login' ? 'Войти' : 'Создать аккаунт'}</Button>
        </div>
      </div>
    </Modal>
  );
}
