'use client';

import { useEffect, useMemo, useState } from 'react';
import { KpiCards } from '@/components/KpiCards';
import { CalendarGrid } from '@/modules/cronograma/CalendarGrid';
import { ActivityPanel } from '@/modules/dashboard/ActivityPanel';
import { ServiceModal } from '@/modules/servicios/ServiceModal';
import { GlobalFilters } from '@/components/GlobalFilters';
import { deleteServicio, fetchComerciales, fetchServicios, upsertServicio } from '@/lib/data';
import { useAppStore } from '@/store/useAppStore';
import { ServicioCompleto } from '@/types/domain';
import { ServicioFormValues } from '@/types/forms';

export const DashboardClient = (): JSX.Element => {
  const [selected, setSelected] = useState<ServicioCompleto | null>(null);
  const [open, setOpen] = useState(false);
  const { setComerciales, setServicios, comerciales } = useAppStore();

  const load = async (): Promise<void> => {
    const [c, s] = await Promise.all([fetchComerciales(), fetchServicios()]);
    setComerciales(c);
    setServicios(s);
  };

  useEffect(() => { void load(); }, []);

  const onSubmit = async (values: ServicioFormValues): Promise<void> => {
    await upsertServicio(values);
    await load();
  };

  const onDelete = async (id: string): Promise<void> => {
    await deleteServicio(id);
    await load();
  };

  const comercialOptions = useMemo(() => comerciales.map(({ id, nombre }) => ({ id, nombre })), [comerciales]);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">CONSITEC · Dashboard Operativo</h1>
          <button className="rounded bg-primary px-4 py-2 text-white" onClick={() => { setSelected(null); setOpen(true); }}>+ Servicio</button>
        </div>
        <GlobalFilters />
        <KpiCards />
        <CalendarGrid onSelect={(s) => { setSelected(s); setOpen(true); }} />
      </div>
      <ActivityPanel onSelect={(s) => { setSelected(s); setOpen(true); }} />
      <ServiceModal
        open={open}
        initial={selected}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        onDelete={onDelete}
        comerciales={comercialOptions}
      />
    </div>
  );
};
