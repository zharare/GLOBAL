'use client';

import { useAppStore } from '@/store/useAppStore';

export const GlobalFilters = (): JSX.Element => {
  const {
    comerciales,
    selectedComercialId,
    setSelectedComercialId,
    filtroInstructor,
    setFiltroInstructor,
    filtroEmpresa,
    setFiltroEmpresa,
  } = useAppStore();

  return (
    <section className="card grid grid-cols-1 gap-3 p-4 md:grid-cols-3">
      <select className="rounded border p-2" value={selectedComercialId ?? ''} onChange={(e) => setSelectedComercialId(e.target.value || null)}>
        <option value="">Todos los comerciales</option>
        {comerciales.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
      </select>
      <input className="rounded border p-2" placeholder="Filtrar por instructor" value={filtroInstructor} onChange={(e) => setFiltroInstructor(e.target.value)} />
      <input className="rounded border p-2" placeholder="Filtrar por empresa" value={filtroEmpresa} onChange={(e) => setFiltroEmpresa(e.target.value)} />
    </section>
  );
};
