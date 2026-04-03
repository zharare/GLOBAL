'use client';

import { format } from 'date-fns';
import { useAppStore } from '@/store/useAppStore';
import { ServicioCompleto } from '@/types/domain';

interface Props {
  onSelect: (servicio: ServicioCompleto) => void;
}

const Section = ({ title, items, onSelect }: { title: string; items: ServicioCompleto[]; onSelect: (s: ServicioCompleto) => void }): JSX.Element => (
  <section>
    <h3 className="mb-2 text-sm font-semibold text-slate-600">{title}</h3>
    <div className="space-y-2">
      {items.map((item) => (
        <button key={item.id} className="card w-full border-l-4 p-3 text-left hover:shadow-md" style={{ borderLeftColor: item.color }} onClick={() => onSelect(item)}>
          <p className="font-medium">{item.empresa}</p>
          <p className="text-xs text-slate-500">{item.curso} · {item.instructor}</p>
          <p className="text-xs text-slate-500">{item.comercial.nombre}</p>
          <p className="mt-1 text-xs">{format(new Date(item.fechas[0].fecha), 'dd/MM/yyyy')} · {item.fechas[0].horas}h</p>
          <div className="mt-2 flex gap-2 text-[10px]">
            <span className="rounded bg-slate-100 px-2 py-1">{item.estado}</span>
            {!item.facturado && <span className="rounded bg-orange-100 px-2 py-1 text-orange-700">No facturado</span>}
            {!item.pagado && <span className="rounded bg-red-100 px-2 py-1 text-red-700">No pagado</span>}
          </div>
        </button>
      ))}
    </div>
  </section>
);

export const ActivityPanel = ({ onSelect }: Props): JSX.Element => {
  const buckets = useAppStore((s) => s.getActivityBuckets());

  return (
    <aside className="sticky top-0 h-screen w-full max-w-[360px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-4">
      <Section title="🔥 HOY" items={buckets.hoy} onSelect={onSelect} />
      <Section title="⚡ MAÑANA" items={buckets.manana} onSelect={onSelect} />
      <Section title="📅 ESTA SEMANA" items={buckets.semana} onSelect={onSelect} />
    </aside>
  );
};
