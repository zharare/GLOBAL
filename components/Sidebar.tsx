'use client';

import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

export const Sidebar = (): JSX.Element => {
  const { sidebarOpen, setSidebarOpen, comerciales } = useAppStore();

  return (
    <aside
      onMouseEnter={() => setSidebarOpen(true)}
      onMouseLeave={() => setSidebarOpen(false)}
      className={cn(
        'sticky top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 overflow-hidden',
        sidebarOpen ? 'w-64' : 'w-16',
      )}
    >
      <button className="m-3 rounded-lg bg-primary px-3 py-2 text-sm text-white" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </button>
      <nav className="space-y-2 px-3 text-sm">
        <Link href="/dashboard" className="block rounded p-2 hover:bg-slate-100">Dashboard</Link>
        <Link href="/cronograma" className="block rounded p-2 hover:bg-slate-100">Cronograma</Link>
        <Link href="/pagos" className="block rounded p-2 hover:bg-slate-100">Pagos</Link>
      </nav>
      <div className="mt-4 border-t border-slate-200 p-3">
        <p className="mb-2 text-xs font-semibold text-slate-500">Comerciales</p>
        <div className="space-y-2">
          {comerciales.map((comercial) => (
            <Link key={comercial.id} href={`/comerciales/${comercial.id}`} className="flex items-center gap-2 rounded p-2 hover:bg-slate-100">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: comercial.color }} />
              {sidebarOpen && <span>{comercial.nombre}</span>}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};
