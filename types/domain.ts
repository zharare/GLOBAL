export type EstadoServicio = 'Programado' | 'Ejecutado' | 'Reprogramado';

export interface Comercial {
  id: string;
  nombre: string;
  color: string;
  created_at: string;
}

export interface Servicio {
  id: string;
  curso: string;
  instructor: string;
  empresa: string;
  comercial_id: string;
  estado: EstadoServicio;
  facturado: boolean;
  pagado: boolean;
  color: string;
  created_at: string;
}

export interface ServicioFecha {
  id: string;
  servicio_id: string;
  fecha: string;
  horas: number;
}

export interface ServicioCompleto extends Servicio {
  comercial: Comercial;
  fechas: ServicioFecha[];
}

export interface DashboardKpi {
  totalServicios: number;
  totalHoras: number;
  serviciosMes: number;
  instructorMasUsado: string;
  cursoMasVendido: string;
  comercialTop: string;
  porcentajeFacturado: number;
  porcentajePagado: number;
}
