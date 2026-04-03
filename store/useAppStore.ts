'use client';

import { addDays, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek } from 'date-fns';
import { create } from 'zustand';
import { Comercial, DashboardKpi, ServicioCompleto } from '@/types/domain';

interface AppState {
  currentMonth: Date;
  sidebarOpen: boolean;
  selectedComercialId: string | null;
  filtroInstructor: string;
  filtroEmpresa: string;
  comerciales: Comercial[];
  servicios: ServicioCompleto[];
  setSidebarOpen: (value: boolean) => void;
  setCurrentMonth: (value: Date) => void;
  setComerciales: (value: Comercial[]) => void;
  setServicios: (value: ServicioCompleto[]) => void;
  setSelectedComercialId: (value: string | null) => void;
  setFiltroInstructor: (value: string) => void;
  setFiltroEmpresa: (value: string) => void;
  getFilteredServices: () => ServicioCompleto[];
  getKpis: () => DashboardKpi;
  getActivityBuckets: () => { hoy: ServicioCompleto[]; manana: ServicioCompleto[]; semana: ServicioCompleto[] };
}

const countBy = (items: string[]): string => {
  if (!items.length) return 'N/A';
  const map = new Map<string, number>();
  items.forEach((item) => map.set(item, (map.get(item) ?? 0) + 1));
  return [...map.entries()].sort((a, b) => b[1] - a[1])[0][0];
};

export const useAppStore = create<AppState>((set, get) => ({
  currentMonth: startOfMonth(new Date()),
  sidebarOpen: false,
  selectedComercialId: null,
  filtroInstructor: '',
  filtroEmpresa: '',
  comerciales: [],
  servicios: [],
  setSidebarOpen: (value) => set({ sidebarOpen: value }),
  setCurrentMonth: (value) => set({ currentMonth: startOfMonth(value) }),
  setComerciales: (value) => set({ comerciales: value.sort((a, b) => a.nombre.localeCompare(b.nombre)) }),
  setServicios: (value) => set({ servicios: value }),
  setSelectedComercialId: (value) => set({ selectedComercialId: value }),
  setFiltroInstructor: (value) => set({ filtroInstructor: value }),
  setFiltroEmpresa: (value) => set({ filtroEmpresa: value }),
  getFilteredServices: () => {
    const { servicios, selectedComercialId, filtroEmpresa, filtroInstructor } = get();
    return servicios.filter((servicio) => {
      const byComercial = selectedComercialId ? servicio.comercial_id === selectedComercialId : true;
      const byInstructor = filtroInstructor
        ? servicio.instructor.toLowerCase().includes(filtroInstructor.toLowerCase())
        : true;
      const byEmpresa = filtroEmpresa ? servicio.empresa.toLowerCase().includes(filtroEmpresa.toLowerCase()) : true;
      return byComercial && byInstructor && byEmpresa;
    });
  },
  getKpis: () => {
    const { currentMonth } = get();
    const filtered = get().getFilteredServices();
    const totalServicios = filtered.length;
    const totalHoras = filtered.flatMap((s) => s.fechas).reduce((acc, curr) => acc + curr.horas, 0);
    const serviciosMes = filtered.filter((s) =>
      s.fechas.some((f) => isSameMonth(new Date(f.fecha), currentMonth)),
    ).length;
    const porcentajeFacturado = totalServicios ? (filtered.filter((s) => s.facturado).length / totalServicios) * 100 : 0;
    const porcentajePagado = totalServicios ? (filtered.filter((s) => s.pagado).length / totalServicios) * 100 : 0;

    return {
      totalServicios,
      totalHoras,
      serviciosMes,
      instructorMasUsado: countBy(filtered.map((s) => s.instructor)),
      cursoMasVendido: countBy(filtered.map((s) => s.curso)),
      comercialTop: countBy(filtered.map((s) => s.comercial.nombre)),
      porcentajeFacturado: Number(porcentajeFacturado.toFixed(1)),
      porcentajePagado: Number(porcentajePagado.toFixed(1)),
    };
  },
  getActivityBuckets: () => {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
    const services = get().getFilteredServices();

    const byDate = (date: Date) => services.filter((s) => s.fechas.some((f) => isSameDay(new Date(f.fecha), date)));

    return {
      hoy: byDate(today),
      manana: byDate(tomorrow),
      semana: services.filter((s) =>
        s.fechas.some((f) => {
          const d = new Date(f.fecha);
          return d > tomorrow && d <= weekEnd;
        }),
      ),
    };
  },
}));

export const dateLabel = (dateISO: string): string => format(new Date(dateISO), 'dd/MM/yyyy');
