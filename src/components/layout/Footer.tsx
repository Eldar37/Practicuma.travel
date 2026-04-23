import Link from 'next/link';

import { Facebook, Instagram, Send, Youtube } from 'lucide-react';

import { Logo } from '@/components/layout/Logo';

const footerGroups = [
  {
    title: 'Туры',
    links: [
      { href: '/tours?category=burning', label: 'Горящие' },
      { href: '/tours?category=weekend', label: 'Выходные' },
      { href: '/tours?category=kyrgyzstan', label: 'По Кыргызстану' }
    ]
  },
  {
    title: 'Контент',
    links: [
      { href: '/content', label: 'Видео' },
      { href: '/content?type=blog', label: 'Блоги' },
      { href: '/content?type=ai-route', label: 'AI-маршруты' }
    ]
  },
  {
    title: 'Компания',
    links: [
      { href: '/about', label: 'О платформе' },
      { href: '/partners', label: 'Партнёрство' },
      { href: '/partners#guides', label: 'Для гидов' }
    ]
  },
  {
    title: 'Помощь',
    links: [
      { href: '/help#faq', label: 'FAQ' },
      { href: '/help#payment', label: 'Оплата' },
      { href: '/help#contacts', label: 'Контакты' }
    ]
  }
];

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
  return (
    <footer className="relative overflow-hidden bg-dark text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:px-8">
        <div className="space-y-5">
          <Logo colorClassName="text-white" className="max-w-sm" />
          <p className="max-w-sm text-sm leading-6 text-slate-300">
            Цифровая travel-платформа Кыргызстана, которая соединяет вдохновение, туры, бронирование и партнёрскую
            монетизацию в одном продукте.
          </p>
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
            <h4 className="font-heading text-base font-bold">{group.title}</h4>
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
          <span>© 2024 Practicuma Travel. Все права защищены.</span>
          <span>Сделано для современной экосистемы туризма Кыргызстана.</span>
        </div>
      </div>
    </footer>
  );
}
