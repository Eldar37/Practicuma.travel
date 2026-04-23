'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { label: 'туров', value: 150, suffix: '+' },
  { label: 'гидов', value: 50, suffix: '+' },
  { label: 'регионов', value: 12, suffix: '' },
  { label: 'рейтинг', value: 4.8, suffix: '★' }
];

export function StatsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [values, setValues] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) {
      return;
    }

    const duration = 1200;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      setValues(stats.map((item) => Number((item.value * progress).toFixed(item.value % 1 === 0 ? 0 : 1))));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active]);

  return (
    <section className="bg-dark text-white" ref={ref}>
      <div className="container-shell grid gap-8 py-8 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
            <p className="font-heading text-4xl font-extrabold text-white">
              {values[index]}
              {stat.suffix}
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/55">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
