import { supabase } from '@/lib/supabase';
import { Comercial, ServicioCompleto } from '@/types/domain';
import { ServicioFormValues } from '@/types/forms';

export const fetchComerciales = async (): Promise<Comercial[]> => {
  const { data, error } = await supabase.from('comerciales').select('*').order('nombre', { ascending: true });
  if (error) throw error;
  return data;
};

export const fetchServicios = async (): Promise<ServicioCompleto[]> => {
  const { data, error } = await supabase
    .from('servicios')
    .select('*, comercial:comerciales(*), fechas:servicio_fechas(*)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const upsertServicio = async (payload: ServicioFormValues): Promise<void> => {
  const { fechas, ...servicio } = payload;

  let servicioId = payload.id;
  if (servicioId) {
    const { error } = await supabase.from('servicios').update(servicio).eq('id', servicioId);
    if (error) throw error;
    const { error: deleteError } = await supabase.from('servicio_fechas').delete().eq('servicio_id', servicioId);
    if (deleteError) throw deleteError;
  } else {
    const { data, error } = await supabase.from('servicios').insert(servicio).select('id').single();
    if (error) throw error;
    servicioId = data.id;
  }

  const { error: fechasError } = await supabase.from('servicio_fechas').insert(
    fechas.map((f) => ({
      servicio_id: servicioId,
      fecha: f.fecha,
      horas: f.horas,
    })),
  );

  if (fechasError) throw fechasError;
};

export const deleteServicio = async (id: string): Promise<void> => {
  const { error } = await supabase.from('servicios').delete().eq('id', id);
  if (error) throw error;
};

export const deleteComercial = async (id: string): Promise<void> => {
  const { error } = await supabase.from('comerciales').delete().eq('id', id);
  if (error) throw error;
};
