import Link from 'next/link';

import { buttonStyles } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="section-shell text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 text-5xl font-extrabold">Страница не найдена</h1>
      <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
        Возможно, ссылка устарела или такого маршрута больше нет. Вернитесь на главную или откройте каталог туров.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className={buttonStyles({ variant: 'primary', size: 'lg' })}>
          На главную
        </Link>
        <Link href="/tours" className={buttonStyles({ variant: 'dark', size: 'lg' })}>
          Смотреть туры
        </Link>
      </div>
    </div>
  );
}
