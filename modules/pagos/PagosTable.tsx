'use client';

import { format, isSameMonth, parseISO } from 'date-fns';
import { useMemo, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

export const PagosTable = (): JSX.Element => {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const servicios = useAppStore((s) => s.getFilteredServices());

  const rows = useMemo(() => {
    const monthDate = parseISO(`${month}-01`);
    return servicios.flatMap((s) =>
      s.fechas
        .filter((f) => isSameMonth(new Date(f.fecha), monthDate))
        .map((f) => ({
          instructor: s.instructor,
          fecha: f.fecha,
          horas: f.horas,
          empresa: s.empresa,
          comercial: s.comercial.nombre,
        })),
    );
  }, [month, servicios]);

  const grouped = rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.instructor] = (acc[row.instructor] ?? 0) + row.horas;
    return acc;
  }, {});

  return (
    <section className="card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Pagos a Instructores</h1>
        <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="rounded border p-2" />
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b"><th>Instructor</th><th>Fecha</th><th>Horas</th><th>Empresa</th><th>Comercial</th></tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={`${row.instructor}-${idx}`} className="border-b">
              <td>{row.instructor}</td><td>{format(new Date(row.fecha), 'dd/MM/yyyy')}</td><td>{row.horas}</td><td>{row.empresa}</td><td>{row.comercial}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
        {Object.entries(grouped).map(([instructor, horas]) => (
          <div key={instructor} className="rounded bg-slate-50 p-2 text-sm"><strong>{instructor}</strong>: {horas}h</div>
        ))}
      </div>
    </section>
  );
};
