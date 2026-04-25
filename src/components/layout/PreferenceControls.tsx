'use client';

import { Languages, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { localeOptions } from '@/lib/i18n';
import { useSitePreferences } from '@/components/preferences/SitePreferencesProvider';

interface PreferenceControlsProps {
  compact?: boolean;
  inverse?: boolean;
}

export function PreferenceControls({ compact = false, inverse = false }: PreferenceControlsProps) {
  const { locale, setLocale, theme, toggleTheme, t } = useSitePreferences();

  const selectClassName = inverse
    ? 'border-white/20 bg-white/10 text-white'
    : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100';

  const iconClassName = inverse ? 'text-white/70' : 'text-slate-400 dark:text-slate-500';

  return (
    <div className={`flex items-center gap-2 ${compact ? 'w-full' : ''}`}>
      <label className={`relative ${compact ? 'flex-1' : ''}`}>
        <Languages className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${iconClassName}`} />
        <select
          aria-label={t('controls.language')}
          value={locale}
          onChange={(event) => setLocale(event.target.value as typeof locale)}
          className={`rounded-full border py-2 pl-9 pr-8 text-sm font-semibold outline-none transition ${selectClassName} ${compact ? 'w-full' : 'w-[140px]'}`}
        >
          {localeOptions.map((option) => (
            <option key={option.value} value={option.value} className="text-slate-900">
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <Button
        variant={inverse ? 'outline' : 'ghost'}
        size="sm"
        aria-label={theme === 'dark' ? t('controls.themeLight') : t('controls.themeDark')}
        onClick={toggleTheme}
        className={inverse ? '' : 'dark:text-slate-100 dark:hover:bg-slate-800'}
      >
        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </div>
  );
}
