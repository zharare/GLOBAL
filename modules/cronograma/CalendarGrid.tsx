'use client';

import { format, isSameDay, isSameMonth, isThisWeek } from 'date-fns';
import { useCalendar } from '@/hooks/useCalendar';
import { useAppStore } from '@/store/useAppStore';
import { ServicioCompleto } from '@/types/domain';
import { cn } from '@/lib/utils';

interface Props {
  onSelect: (servicio: ServicioCompleto) => void;
}

export const CalendarGrid = ({ onSelect }: Props): JSX.Element => {
  const month = useAppStore((s) => s.currentMonth);
  const services = useAppStore((s) => s.getFilteredServices());
  const dates = useCalendar(month);

  return (
    <section className="card p-4">
      <div className="mb-3 grid grid-cols-7 text-center text-xs font-semibold text-slate-500">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date) => {
          const events = services.filter((s) => s.fechas.some((f) => isSameDay(new Date(f.fecha), date)));
          return (
            <div key={date.toISOString()} className={cn('min-h-28 rounded-lg border p-2', !isSameMonth(date, month) && 'opacity-30', isThisWeek(date, { weekStartsOn: 1 }) && 'bg-orange-50')}>
              <p className="text-xs font-medium">{format(date, 'd')}</p>
              <div className="mt-2 space-y-1">
                {events.slice(0, 2).map((e) => (
                  <button
                    key={`${e.id}-${date.toISOString()}`}
                    onClick={() => onSelect(e)}
                    className="w-full truncate rounded px-2 py-1 text-left text-xs text-white"
                    style={{ backgroundColor: e.comercial.color }}
                  >
                    {e.empresa}
                  </button>
                ))}
                {events.length > 2 && <p className="text-[11px] text-slate-500">+{events.length - 2} más</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
