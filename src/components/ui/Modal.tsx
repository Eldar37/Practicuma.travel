'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        aria-label="Закрыть модальное окно"
        onClick={onClose}
      />
      <div className={cn('relative z-10 w-full max-w-4xl rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8', className)}>
        <div className="mb-6 flex items-start justify-between gap-4">
          {title ? <h3 className="font-heading text-2xl font-bold text-dark">{title}</h3> : <span />}
          <button
            aria-label="Закрыть"
            className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
