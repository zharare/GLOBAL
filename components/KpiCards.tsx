'use client';

import { useAppStore } from '@/store/useAppStore';

export const KpiCards = (): JSX.Element => {
  const kpis = useAppStore((s) => s.getKpis());

  const cards = [
    ['Total servicios', kpis.totalServicios],
    ['Total horas', kpis.totalHoras],
    ['Servicios del mes', kpis.serviciosMes],
    ['Instructor más usado', kpis.instructorMasUsado],
    ['Curso más vendido', kpis.cursoMasVendido],
    ['Comercial top', kpis.comercialTop],
    ['% facturados', `${kpis.porcentajeFacturado}%`],
    ['% pagados', `${kpis.porcentajePagado}%`],
  ];

  return (
    <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {cards.map(([label, value]) => (
        <article key={label} className="card p-4">
          <p className="text-xs text-slate-500">{label}</p>
          <p className="mt-2 text-xl font-semibold text-primary">{value}</p>
        </article>
      ))}
    </section>
  );
};
