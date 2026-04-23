import { PartnerForm } from '@/components/partners/PartnerForm';
import { SectionHeading } from '@/components/shared/SectionHeading';

export default function PartnersPage() {
  return (
    <div className="section-shell space-y-12">
      <SectionHeading
        eyebrow="Partners"
        title="Партнёрство с Practicuma Travel"
        description="Для гидов, туроператоров, тревел-авторов и локальных команд. Подключайтесь к платформе как поставщик туров, контента или сервисов."
      />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
        <PartnerForm />
        <aside className="space-y-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="text-2xl font-bold">Что можно подключить</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Туры', 'Гиды', 'Видео', 'Маршруты', 'Трансферы', 'Юртовые лагеря'].map((item) => (
                <span key={item} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div id="guides" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="text-2xl font-bold">Для гидов</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Можно подключить профиль, пакеты туров и контентные материалы. В этой версии форма заявки уже рабочая и сохраняет локальную запись.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
