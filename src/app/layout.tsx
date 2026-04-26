import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import type { ReactNode } from 'react';

import { FloatingAIAssistant } from '@/components/ai/FloatingAIAssistant';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { SitePreferencesProvider } from '@/components/preferences/SitePreferencesProvider';

import './globals.css';

const headingFont = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800']
});

const bodyFont = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  weight: ['400', '500', '600']
});

export const metadata: Metadata = {
  title: 'Practicuma Travel',
  description: 'Платформа туризма Кыргызстана: контент, туры, карта и бронирование в одном интерфейсе.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${headingFont.variable} ${bodyFont.variable} bg-background font-body text-slate-700 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-200`}>
        <SitePreferencesProvider>
          <AuthProvider>
            <Navbar />
            <div className="min-h-screen pt-20">{children}</div>
            <Footer />
            <FloatingAIAssistant />
          </AuthProvider>
        </SitePreferencesProvider>
      </body>
    </html>
  );
}
