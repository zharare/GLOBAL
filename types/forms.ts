import { z } from 'zod';

export const servicioFechaSchema = z.object({
  fecha: z.string().min(1, 'Fecha obligatoria'),
  horas: z.coerce.number().int().positive('Horas debe ser mayor a 0'),
});

export const servicioSchema = z.object({
  id: z.string().optional(),
  curso: z.string().min(2),
  instructor: z.string().min(2),
  empresa: z.string().min(2),
  comercial_id: z.string().uuid(),
  estado: z.enum(['Programado', 'Ejecutado', 'Reprogramado']),
  facturado: z.boolean(),
  pagado: z.boolean(),
  color: z.string().min(4),
  fechas: z.array(servicioFechaSchema).min(1, 'Al menos una fecha'),
});

export type ServicioFormValues = z.infer<typeof servicioSchema>;
