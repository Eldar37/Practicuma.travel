'use client';

import Link from 'next/link';

import { Facebook, Instagram, Send, Youtube } from 'lucide-react';

import { Logo } from '@/components/layout/Logo';
import { useSitePreferences } from '@/components/preferences/SitePreferencesProvider';

const socialLinks = [
  {
    href: 'https://www.instagram.com/practicuma.online/',
    label: 'Instagram',
    icon: Instagram
  },
  {
    href: 'https://www.youtube.com/@practicuma',
    label: 'YouTube',
    icon: Youtube
  },
  {
    href: 'https://www.facebook.com/practicuma',
    label: 'Facebook',
    icon: Facebook
  },
  {
    href: 'https://t.me/+EwsDlZtB1QdhNTVi',
    label: 'Telegram',
    icon: Send
  }
];

export function Footer() {
  const { t } = useSitePreferences();

  const footerGroups = [
    {
      title: t('footer.tours'),
      links: [
        { href: '/tours?category=burning', label: t('footer.hot') },
        { href: '/tours?category=weekend', label: t('footer.weekend') },
        { href: '/tours?category=kyrgyzstan', label: t('footer.kyrgyzstan') }
      ]
    },
    {
      title: t('footer.content'),
      links: [
        { href: '/content', label: t('footer.videos') },
        { href: '/content?type=blog', label: t('footer.blogs') },
        { href: '/#ai-assistant', label: t('footer.ai') }
      ]
    },
    {
      title: t('footer.company'),
      links: [
        { href: '/about', label: t('footer.aboutPlatform') },
        { href: '/partners', label: t('footer.partnership') },
        { href: '/partners#guides', label: t('footer.forGuides') }
      ]
    },
    {
      title: t('footer.help'),
      links: [
        { href: '/help#faq', label: 'FAQ' },
        { href: '/help#payment', label: t('footer.payment') },
        { href: '/help#contacts', label: t('footer.contacts') }
      ]
    }
  ];

  return (
    <footer className="relative overflow-hidden bg-dark text-white dark:bg-slate-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:px-8">
        <div className="space-y-5">
          <Logo colorClassName="text-white" className="max-w-sm" />
          <p className="max-w-sm text-sm leading-6 text-slate-300">{t('footer.description')}</p>
          <div className="flex gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                  title={item.label}
                  className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:border-white/30 hover:bg-white/10"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h4 className="font-heading text-base font-bold text-white">{group.title}</h4>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link className="transition hover:text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-slate-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <span>{t('footer.copyright')}</span>
          <span>{t('footer.madeFor')}</span>
        </div>
      </div>
    </footer>
  );
}
